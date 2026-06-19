import { useState, useEffect, useCallback } from "react";
import { fetchAllEmails, saveEmail, removeEmail, triggerExpiryCheck } from "../services/api";

export function useEmails(toast) {
  const [emails, setEmails]           = useState([]);
  const [fetching, setFetching]       = useState(true);
  const [saving, setSaving]           = useState(false);
  const [deleting, setDeleting]       = useState(null);
  const [cronLoading, setCronLoading] = useState(false);
  const [cronResult, setCronResult]   = useState(null);

  const loadEmails = useCallback(async () => {
    try {
      const data = await fetchAllEmails();
      setEmails(data);
    } catch (e) {
      toast(e.message, "error");
    } finally {
      setFetching(false);
    }
  }, [toast]);

  useEffect(() => { loadEmails(); }, [loadEmails]);

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

  return {
    emails, fetching,
    saving, handleSave,
    deleting, handleDelete,
    cronLoading, cronResult, setCronResult, handleCron,
  };
}