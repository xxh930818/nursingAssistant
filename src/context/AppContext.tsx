import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  ServiceOrder,
  Message,
  NurseProfile,
  AttendanceRecord,
  VitalSigns,
  MealRecord,
  MedicationRecord,
  serviceOrders as initialOrders,
  messages as initialMessages,
  nurseProfile as initialProfile,
  attendanceRecords as initialAttendance
} from '../data/mockData';

interface AppContextType {
  // 订单相关
  orders: ServiceOrder[];
  getOrdersByStatus: (status: 'pending' | 'serving' | 'completed') => ServiceOrder[];
  updateOrderStatus: (orderId: string, status: 'pending' | 'serving' | 'completed') => void;
  getOrderById: (id: string) => ServiceOrder | undefined;

  // 消息相关
  messages: Message[];
  markMessageAsRead: (messageId: number) => void;
  markAllMessagesAsRead: () => void;
  getUnreadCount: () => number;

  // 用户信息
  profile: NurseProfile;
  updateProfile: (updates: Partial<NurseProfile>) => void;

  // 考勤相关
  attendance: AttendanceRecord[];
  punchIn: (shiftType: 'day' | 'night') => void;

  // 护理记录
  vitalSigns: VitalSigns[];
  addVitalSigns: (record: VitalSigns) => void;

  mealRecords: MealRecord[];
  addMealRecord: (record: MealRecord) => void;

  medicationRecords: MedicationRecord[];
  addMedicationRecord: (record: MedicationRecord) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<ServiceOrder[]>(initialOrders);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [profile, setProfile] = useState<NurseProfile>(initialProfile);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [vitalSigns, setVitalSigns] = useState<VitalSigns[]>([]);
  const [mealRecords, setMealRecords] = useState<MealRecord[]>([]);
  const [medicationRecords, setMedicationRecords] = useState<MedicationRecord[]>([]);

  // 订单相关方法
  const getOrdersByStatus = useCallback((status: 'pending' | 'serving' | 'completed') => {
    return orders.filter(order => order.status === status);
  }, [orders]);

  const updateOrderStatus = useCallback((orderId: string, status: 'pending' | 'serving' | 'completed') => {
    setOrders(prev => prev.map(order =>
      order.id === orderId ? { ...order, status } : order
    ));
  }, []);

  const getOrderById = useCallback((id: string) => {
    return orders.find(order => order.id === id);
  }, [orders]);

  // 消息相关方法
  const markMessageAsRead = useCallback((messageId: number) => {
    setMessages(prev => prev.map(msg =>
      msg.id === messageId ? { ...msg, unread: false, unreadCount: 0 } : msg
    ));
  }, []);

  const markAllMessagesAsRead = useCallback(() => {
    setMessages(prev => prev.map(msg => ({ ...msg, unread: false, unreadCount: 0 })));
  }, []);

  const getUnreadCount = useCallback(() => {
    return messages.filter(msg => msg.unread).length;
  }, [messages]);

  // 用户信息方法
  const updateProfile = useCallback((updates: Partial<NurseProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, []);

  // 考勤相关方法
  const punchIn = useCallback((shiftType: 'day' | 'night') => {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toTimeString().slice(0, 5);

    setAttendance(prev => {
      const existing = prev.find(a => a.date === today && a.shiftType === shiftType);
      if (existing) {
        return prev.map(a =>
          a.date === today && a.shiftType === shiftType
            ? { ...a, actualTime: now, status: 'completed' }
            : a
        );
      }
      return [...prev, {
        date: today,
        shiftType,
        scheduledTime: shiftType === 'day' ? '08:00' : '20:00',
        actualTime: now,
        status: 'completed'
      }];
    });
  }, []);

  // 护理记录方法
  const addVitalSigns = useCallback((record: VitalSigns) => {
    setVitalSigns(prev => [...prev, record]);
  }, []);

  const addMealRecord = useCallback((record: MealRecord) => {
    setMealRecords(prev => [...prev, record]);
  }, []);

  const addMedicationRecord = useCallback((record: MedicationRecord) => {
    setMedicationRecords(prev => [...prev, record]);
  }, []);

  const value: AppContextType = {
    orders,
    getOrdersByStatus,
    updateOrderStatus,
    getOrderById,
    messages,
    markMessageAsRead,
    markAllMessagesAsRead,
    getUnreadCount,
    profile,
    updateProfile,
    attendance,
    punchIn,
    vitalSigns,
    addVitalSigns,
    mealRecords,
    addMealRecord,
    medicationRecords,
    addMedicationRecord,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
