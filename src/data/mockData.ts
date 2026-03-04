// 模拟数据 - 护理助手应用

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  phone: string;
  address: string;
  nursingLevel: string;
  medicalHistory: string[];
  allergies: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface ServiceOrder {
  id: string;
  patientId: string;
  patient: Patient;
  type: string;
  scheduledTime: {
    date: string;
    startTime: string;
    endTime: string;
  };
  address: string;
  status: 'pending' | 'serving' | 'completed';
  notes?: string;
  createdAt: string;
}

export interface VitalSigns {
  id: string;
  orderId: string;
  timestamp: string;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  temperature: number;
  bloodSugar?: number;
  oxygenSaturation: number;
  notes?: string;
}

export interface MealRecord {
  id: string;
  orderId: string;
  timestamp: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodItems: string[];
  intakeAmount: 'full' | 'half' | 'little' | 'none';
  appetite: 'good' | 'normal' | 'poor';
  notes?: string;
}

export interface MedicationRecord {
  id: string;
  orderId: string;
  timestamp: string;
  medicationName: string;
  dosage: string;
  administered: boolean;
  notes?: string;
}

export interface Message {
  id: number;
  type: 'admin' | 'family' | 'system';
  name: string;
  avatar?: string;
  icon?: any;
  time: string;
  content: string;
  unread: boolean;
  unreadCount?: number;
  status?: string;
}

export interface NurseProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  experience: number;
  specialty: string;
  rating: number;
  totalOrders: number;
  certificates: {
    name: string;
    verified: boolean;
    validUntil: string;
  }[];
  weeklyHours: number[];
  goodRate: number;
  badReviews: number;
}

export interface AttendanceRecord {
  date: string;
  shiftType: 'day' | 'night';
  scheduledTime: string;
  actualTime?: string;
  status: 'pending' | 'completed' | 'late' | 'absent';
}

// 患者数据
export const patients: Patient[] = [
  {
    id: '1',
    name: '张建国',
    age: 72,
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200',
    phone: '138****1234',
    address: '朝阳区幸福路12号',
    nursingLevel: '三级护理',
    medicalHistory: ['高血压', '糖尿病'],
    allergies: ['青霉素'],
    emergencyContact: {
      name: '张小明',
      relationship: '儿子',
      phone: '139****5678'
    }
  },
  {
    id: '2',
    name: '李淑芬',
    age: 68,
    gender: '女',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    phone: '137****2345',
    address: '海淀区中关村南大街5号',
    nursingLevel: '二级护理',
    medicalHistory: ['冠心病'],
    allergies: [],
    emergencyContact: {
      name: '李华',
      relationship: '女儿',
      phone: '136****9012'
    }
  },
  {
    id: '3',
    name: '王德明',
    age: 75,
    gender: '男',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    phone: '139****3456',
    address: '西城区金融街18号',
    nursingLevel: '一级护理',
    medicalHistory: ['脑卒中后遗症', '高血压', '糖尿病'],
    allergies: ['磺胺类药物'],
    emergencyContact: {
      name: '王芳',
      relationship: '女儿',
      phone: '138****7890'
    }
  }
];

// 服务订单数据
export const serviceOrders: ServiceOrder[] = [
  {
    id: '1',
    patientId: '1',
    patient: patients[0],
    type: '康复护理',
    scheduledTime: {
      date: '2023-10-24',
      startTime: '09:30',
      endTime: '11:00'
    },
    address: '朝阳区幸福路12号',
    status: 'pending',
    notes: '需要进行康复训练，重点关注腿部功能恢复',
    createdAt: '2023-10-23 14:00:00'
  },
  {
    id: '2',
    patientId: '2',
    patient: patients[1],
    type: '基础生命体征监测',
    scheduledTime: {
      date: '2023-10-24',
      startTime: '14:00',
      endTime: '15:30'
    },
    address: '海淀区中关村南大街5号',
    status: 'pending',
    createdAt: '2023-10-23 15:30:00'
  },
  {
    id: '3',
    patientId: '3',
    patient: patients[2],
    type: '日常生活护理',
    scheduledTime: {
      date: '2023-10-25',
      startTime: '10:00',
      endTime: '12:00'
    },
    address: '西城区金融街18号',
    status: 'pending',
    notes: '需要协助进食和服药',
    createdAt: '2023-10-23 16:00:00'
  },
  {
    id: '4',
    patientId: '1',
    patient: patients[0],
    type: '康复护理',
    scheduledTime: {
      date: '2023-10-15',
      startTime: '09:30',
      endTime: '11:00'
    },
    address: '朝阳区幸福路12号',
    status: 'completed',
    createdAt: '2023-10-14 14:00:00'
  },
  {
    id: '5',
    patientId: '2',
    patient: patients[1],
    type: '康复训练',
    scheduledTime: {
      date: '2023-10-15',
      startTime: '14:00',
      endTime: '16:30'
    },
    address: '海淀区中关村南大街5号',
    status: 'completed',
    createdAt: '2023-10-14 15:30:00'
  }
];

// 生命体征记录
export const vitalSignsRecords: VitalSigns[] = [
  {
    id: '1',
    orderId: '1',
    timestamp: '2023-10-24 09:45:00',
    bloodPressure: {
      systolic: 135,
      diastolic: 85
    },
    heartRate: 76,
    temperature: 36.5,
    bloodSugar: 6.8,
    oxygenSaturation: 98,
    notes: '患者状态良好'
  }
];

// 饮食记录
export const mealRecords: MealRecord[] = [
  {
    id: '1',
    orderId: '1',
    timestamp: '2023-10-24 08:00:00',
    mealType: 'breakfast',
    foodItems: ['小米粥', '鸡蛋', '馒头'],
    intakeAmount: 'full',
    appetite: 'good',
    notes: '早餐进食正常'
  }
];

// 用药记录
export const medicationRecords: MedicationRecord[] = [
  {
    id: '1',
    orderId: '1',
    timestamp: '2023-10-24 08:00:00',
    medicationName: '降压药（硝苯地平）',
    dosage: '10mg',
    administered: true,
    notes: '按时服药'
  }
];

// 消息数据
export const messages: Message[] = [
  {
    id: 1,
    type: 'admin',
    name: '医护主管 - 李医生',
    time: '14:20',
    content: '关于302病房的护理计划已更新，请查阅。',
    unread: true,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200',
    status: 'online'
  },
  {
    id: 2,
    type: 'family',
    name: '王爷爷家属 (长女)',
    time: '12:05',
    content: '王爷爷今天胃口怎么样？中午吃了吗？',
    unread: true,
    unreadCount: 2,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 3,
    type: 'system',
    name: '行政管理中心',
    time: '昨天',
    content: '本周员工培训会议定于周五下午三点。',
    unread: false,
    icon: 'Building'
  },
  {
    id: 4,
    type: 'family',
    name: '张奶奶家属 (次子)',
    time: '星期一',
    content: '谢谢您的细心照顾，我们下周来看她。',
    unread: false,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200'
  }
];

// 护士个人信息
export const nurseProfile: NurseProfile = {
  id: '1',
  name: '张美玲',
  avatar: 'https://images.unsplash.com/photo-1594824436998-d40d59f12282?auto=format&fit=crop&q=80&w=200',
  title: '高级护理员',
  experience: 5,
  specialty: '擅长术后康复',
  rating: 4.9,
  totalOrders: 1284,
  certificates: [
    {
      name: '高级护理职业资格证',
      verified: true,
      validUntil: '2026-12'
    },
    {
      name: '急救技能 (CPR) 培训',
      verified: true,
      validUntil: '2025-05'
    }
  ],
  weeklyHours: [4.5, 6.0, 8.5, 5.5, 9.5, 3.0, 2.0],
  goodRate: 98,
  badReviews: 0
};

// 考勤记录
export const attendanceRecords: AttendanceRecord[] = [
  {
    date: '2023-10-24',
    shiftType: 'day',
    scheduledTime: '08:00',
    actualTime: '07:52',
    status: 'completed'
  },
  {
    date: '2023-10-24',
    shiftType: 'night',
    scheduledTime: '20:00',
    status: 'pending'
  }
];
