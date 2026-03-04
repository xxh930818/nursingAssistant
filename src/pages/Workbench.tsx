import React, { useState } from "react";
import { User, Bell, AlertCircle, Timer, CheckCircle, ChevronRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";
import { useApp } from "@/context/AppContext";

export default function Workbench() {
  const navigate = useNavigate();
  const { orders, getOrdersByStatus, updateOrderStatus, attendance, punchIn, getUnreadCount } = useApp();
  const [activeTab, setActiveTab] = useState("pending");
  const [activeDate, setActiveDate] = useState(24);

  const tabs = [
    { id: "pending", label: "待接收", count: getOrdersByStatus('pending').length },
    { id: "serving", label: "服务中", count: getOrdersByStatus('serving').length },
    { id: "completed", label: "已完成", count: getOrdersByStatus('completed').length },
  ];

  // 自动选择有待订单的标签
  React.useEffect(() => {
    if (getOrdersByStatus('pending').length > 0 && activeTab !== 'pending') {
      setActiveTab('pending');
    }
  }, []);

  const dates = [
    { day: "周二", date: 24 },
    { day: "周三", date: 25 },
    { day: "周四", date: 26 },
    { day: "周五", date: 27 },
    { day: "周六", date: 28 },
  ];

  // 获取今日考勤状态
  const todayAttendance = attendance.filter(a => a.date === '2023-10-24');
  const dayShiftCompleted = todayAttendance.some(a => a.shiftType === 'day' && a.status === 'completed');
  const nightShiftCompleted = todayAttendance.some(a => a.shiftType === 'night' && a.status === 'completed');

  // 获取当前显示的订单
  const currentOrders = getOrdersByStatus(activeTab as 'pending' | 'serving' | 'completed');

  const handlePunchIn = (shiftType: 'day' | 'night') => {
    punchIn(shiftType);
    toast.success(`${shiftType === 'day' ? '白班' : '晚班'}签到成功！`);
  };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'serving');
    toast.success('订单已接收');
  };

  const unreadCount = getUnreadCount();

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white shadow-xl overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center bg-white p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-100">
        <div 
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-blue-600 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          工作台
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button
            onClick={() => navigate("/communication")}
            className="relative flex size-10 items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 size-5 flex items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold">
                {unreadCount}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Status Tabs */}
      <div className="bg-white">
        <div className="flex border-b border-slate-100 px-4 justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 flex-1 transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold">{tab.label}</p>
                {tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                    activeTab === tab.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}>
                    {tab.count}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Training Banner */}
        <div className="p-4">
          <div 
            className="relative overflow-hidden rounded-xl h-44 bg-slate-200 cursor-pointer group"
            onClick={() => toast.info("正在打开培训视频...")}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10"></div>
            <img
              alt="Training banner"
              className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-500"
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800"
            />
            <div className="absolute bottom-0 left-0 p-4 z-20">
              <span className="inline-block bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-2">
                培训计划
              </span>
              <p className="text-white text-xl font-bold leading-tight">
                护理技能在线培训：<br />新入职护士必看手册
              </p>
            </div>
          </div>
        </div>

        {/* Dispatch Reminder Card */}
        {activeTab === "pending" && currentOrders.length > 0 && (
          <div className="px-4 pb-4">
            <div className="flex flex-col items-stretch justify-start rounded-xl shadow-sm border border-slate-100 bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="text-blue-600 w-5 h-5" />
                <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">待办提醒</p>
              </div>
              <p className="text-slate-900 text-lg font-bold leading-tight mb-1">今日派单提醒</p>
              <div className="flex items-center justify-between gap-4">
                <p className="text-slate-500 text-sm">您有 {currentOrders.length} 个待接收的居家养老服务订单，请尽快处理。</p>
                <Link
                  to={`/order/${currentOrders[0].id}`}
                  className="shrink-0 flex items-center justify-center rounded-lg h-9 px-4 bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors"
                >
                  立即查看
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Punch-in Widget (A/N Shifts) */}
        <div className="px-4 pb-4">
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <Timer className="text-blue-600 w-5 h-5" />
                <h3 className="font-bold text-slate-800">考勤打卡</h3>
              </div>
              <span className="text-xs bg-white px-2 py-1 rounded-full text-slate-500 shadow-sm">
                2023.10.24
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className={`bg-white p-3 rounded-lg shadow-sm ${dayShiftCompleted ? 'border-2 border-green-500/20' : ''}`}>
                <p className="text-[10px] text-slate-400 font-bold mb-1">白班 (A)</p>
                <p className="text-sm font-bold text-slate-700">08:00 - 20:00</p>
                {dayShiftCompleted ? (
                  <div className="mt-2 flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[10px] font-bold">已签到 07:52</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePunchIn('day')}
                    className="mt-2 w-full py-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded text-[10px] font-bold"
                  >
                    待签到
                  </button>
                )}
              </div>
              <div className={`bg-white p-3 rounded-lg shadow-sm ${nightShiftCompleted ? 'border-2 border-green-500/20' : 'border-2 border-blue-600/20'}`}>
                <p className="text-[10px] text-slate-400 font-bold mb-1">晚班 (N)</p>
                <p className="text-sm font-bold text-slate-700">20:00 - 08:00</p>
                {nightShiftCompleted ? (
                  <div className="mt-2 flex items-center gap-1 text-green-500">
                    <CheckCircle className="w-3 h-3" />
                    <span className="text-[10px] font-bold">已签到</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handlePunchIn('night')}
                    className="mt-2 w-full py-1 bg-blue-600 hover:bg-blue-700 transition-colors text-white rounded text-[10px] font-bold"
                  >
                    待签到
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar/Schedule View */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-slate-800">日程安排</h3>
            <button 
              onClick={() => toast.info("打开全月日历")}
              className="text-xs text-blue-600 font-bold hover:underline"
            >
              查看全月
            </button>
          </div>
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
            {dates.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveDate(item.date)}
                className={`flex flex-col items-center justify-center min-w-[50px] h-16 rounded-xl transition-colors ${
                  activeDate === item.date
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-slate-100 hover:bg-slate-50"
                }`}
              >
                <p className={`text-[10px] ${activeDate === item.date ? "opacity-80" : "text-slate-400"}`}>{item.day}</p>
                <p className={`text-lg font-bold ${activeDate !== item.date && "text-slate-700"}`}>
                  {item.date}
                </p>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {/* 显示当前选中标签的所有订单 */}
            {currentOrders.length > 0 ? (
              currentOrders.map(order => (
                <Link
                  key={order.id}
                  to={`/order/${order.id}`}
                  className="flex items-center gap-4 p-3 bg-white rounded-xl border-l-4 border-blue-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="text-center shrink-0">
                    <p className="text-sm font-bold text-slate-800">{order.scheduledTime.startTime}</p>
                    <p className="text-[10px] text-slate-400">{order.scheduledTime.endTime}</p>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-slate-800">{order.patient.name} - {order.type}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded ${
                        order.status === 'pending' ? 'bg-orange-100 text-orange-700' :
                        order.status === 'serving' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {order.status === 'pending' ? '待接收' : order.status === 'serving' ? '服务中' : '已完成'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">{order.address}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{order.scheduledTime.date}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                <Timer className="w-12 h-12 mb-2 opacity-20" />
                <p className="text-sm">该状态下暂无订单</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
