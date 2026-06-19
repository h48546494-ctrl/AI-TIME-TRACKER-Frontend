import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchAllEmails, fetchActiveEmails, fetchInactiveEmails,
  saveEmail, removeEmail, triggerExpiryCheck, removeDuplicateEmails,
} from "../services/api";

export function useEmails(toast) {
  const [emails, setEmails]           = useState([]);
  const [filterMode, setFilterMode]   = useState("all"); // 'all' | 'active' | 'inactive'
  const [fetching, setFetching]       = useState(true);
  const [saving, setSaving]           = useState(false);
  const [deleting, setDeleting]       = useState(null);
  const [cronLoading, setCronLoading] = useState(false);
  const [cronResult, setCronResult]   = useState(null);
  const [removingDuplicates, setRemovingDuplicates] = useState(false);

  const loadEmails = useCallback(async (mode = filterMode) => {
    setFetching(true);
    try {
      const fetcher = mode === "active" ? fetchActiveEmails
        : mode === "inactive" ? fetchInactiveEmails
        : fetchAllEmails;
      const data = await fetcher();
      setEmails(data);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setFetching(false);
    }
  }, [toast, filterMode]);

  useEffect(() => { loadEmails(filterMode); }, [filterMode]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeFilter = (mode) => setFilterMode(mode);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      const data = await saveEmail(payload);
      toast(data.message);
      await loadEmails();
      return true;
    } catch (e) {
      toast(e.message, "error");
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (emailId) => {
    setDeleting(emailId);
    try {
      await removeEmail(emailId);
      toast(`Deleted ${emailId}`);
      await loadEmails();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setDeleting(null);
    }
  };

  const handleCron = async () => {
    setCronLoading(true);
    setCronResult(null);
    try {
      const data = await triggerExpiryCheck();
      setCronResult(data);
      toast(data.message, data.activated?.length ? "warn" : "success");
      await loadEmails();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setCronLoading(false);
    }
  };

  const handleRemoveDuplicates = async () => {
    setRemovingDuplicates(true);
    try {
      const data = await removeDuplicateEmails();
      toast(data.message, data.removed?.length ? "warn" : "success");
      await loadEmails();
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setRemovingDuplicates(false);
    }
  };

  const counts = useMemo(() => {
    const active = emails.filter((e) => e.claudeTime || e.geminiTime).length;
    return { total: emails.length, active, inactive: emails.length - active };
  }, [emails]);

  return {
    emails, fetching, loadEmails,
    filterMode, changeFilter,
    saving, handleSave,
    deleting, handleDelete,
    cronLoading, cronResult, setCronResult, handleCron,
    removingDuplicates, handleRemoveDuplicates,
    counts,
  };
}