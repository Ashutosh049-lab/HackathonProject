// src/features/complaints/complaintsThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

// ✅ Create complaint (requires user token)
export const createComplaint = createAsyncThunk(
  "complaints/create",
  async (payload, { rejectWithValue }) => {
    try {
      const { token, ...data } = payload;
      const res = await API.post("/complaints", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.complaint;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Fetch all public complaints
export const fetchAllComplaints = createAsyncThunk(
  "complaints/fetchAll",
  async (token, { rejectWithValue }) => {
    try {
      const res = await API.get("/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Fetch logged-in user's complaints
export const fetchMyComplaints = createAsyncThunk(
  "complaints/fetchMy",
  async (token, { rejectWithValue }) => {
    try {
      const res = await API.get("/complaints/my-complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Get complaint by ID
export const fetchComplaintById = createAsyncThunk(
  "complaints/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await API.get(`/complaints/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Admin: Update complaint status and/or add comment
export const adminUpdateComplaint = createAsyncThunk(
  "complaints/adminUpdateComplaint",
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      const res = await API.patch(`/complaints/${id}/status`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.complaint;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Admin: Add comment to complaint
export const adminAddComment = createAsyncThunk(
  "complaints/adminAddComment",
  async ({ id, comment, token }, { rejectWithValue }) => {
    try {
      const res = await API.post(`/complaints/${id}/comment`, { comment }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.complaint;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Admin: Get all complaints with admin privileges
export const fetchAdminComplaints = createAsyncThunk(
  "complaints/fetchAdminComplaints",
  async (token, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/complaints", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.complaints || res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Admin: Get complaint statistics
export const fetchAdminStatistics = createAsyncThunk(
  "complaints/fetchAdminStatistics",
  async (token, { rejectWithValue }) => {
    try {
      const res = await API.get("/admin/statistics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

// ✅ Delete complaint (by owner or admin)
export const deleteComplaint = createAsyncThunk(
  "complaints/delete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      await API.delete(`/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id; // Return the deleted complaint ID
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);
