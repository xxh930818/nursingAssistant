import { useState } from "react";
import { ArrowLeft, Bell, AlertTriangle, UserX, Users, Stethoscope, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

export default function Communication() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "admin",
      name: "医护主管 - 李医生",
      time: "14:20",
      content: "关于302病房的护理计划已更新，请查阅。",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=200",
      status: "online"
    },
    {
      id: 2,
      type: "family",
      name: "王爷爷家属 (长女)",
      time: "12:05",
      content: "王爷爷今天胃口怎么样？中午吃了吗？",
      unread: true,
      unreadCount: 2,
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    },
    {
      id: 3,
      type: "system",
      name: "行政管理中心",
      time: "昨天",
      content: "本周员工培训会议定于周五下午三点。",
      unread: false,
      icon: Building
    },
    {
      id: 4,
      type: "family",
      name: "张奶奶家属 (次子)",
      time: "星期一",
      content: "谢谢您的细心照顾，我们下周来看她。",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
    }
  ]);

  const handleSOS = () => {
    toast.error("已发送紧急求助信号！", {
      description: "管理中心和附近医护人员已收到通知",
      duration: 5000,
    });
  };

  const handleQuickAlert = (type: string) => {
    toast.warning(`已发送【${type}】警报`, {
      description: "请保持冷静，支援马上就到",
    });
  };

  const markAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, unread: false, unreadCount: 0 })));
    toast.success("已全部标记为已读");
  };

  const openChat = (id: number, name: string) => {
    setMessages(messages.map(m => m.id === id ? { ...m, unread: false, unreadCount: 0 } : m));
    toast.info(`打开与 ${name} 的对话`);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full max-w-md mx-auto flex-col bg-white overflow-x-hidden">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center bg-white p-4 border-b border-slate-200 justify-between">
        <div
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display">
          沟通与报备
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => toast.info("暂无新通知")}
            className="flex items-center justify-center rounded-full size-10 bg-transparent text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* SOS Section */}
        <div className="px-4 py-4 bg-white">
          <button 
            onClick={handleSOS}
            className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white rounded-xl py-4 shadow-lg shadow-red-200 transition-colors active:scale-[0.98]"
          >
            <AlertTriangle className="w-8 h-8 animate-pulse" />
            <span className="text-xl font-bold font-display">SOS / 紧急报备</span>
          </button>
        </div>

        {/* Quick Alert Icons */}
        <div className="px-4 pt-6 pb-2">
          <h3 className="text-slate-900 text-base font-bold font-display px-1">
            快捷警报
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-3 px-4">
          <button 
            onClick={() => handleQuickAlert("摔倒")}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 transition-all active:scale-95 hover:bg-slate-50"
          >
            <div className="bg-blue-600/10 p-2 rounded-full text-blue-600">
              <UserX className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-700">摔倒</span>
          </button>
          <button 
            onClick={() => handleQuickAlert("纠纷")}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 transition-all active:scale-95 hover:bg-slate-50"
          >
            <div className="bg-blue-600/10 p-2 rounded-full text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-700">纠纷</span>
          </button>
          <button 
            onClick={() => handleQuickAlert("突发疾病")}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white p-4 transition-all active:scale-95 hover:bg-slate-50"
          >
            <div className="bg-blue-600/10 p-2 rounded-full text-blue-600">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-slate-700">突发疾病</span>
          </button>
        </div>

        {/* Chat Message List */}
        <div className="px-4 pt-8 pb-2 flex justify-between items-center">
          <h3 className="text-slate-900 text-base font-bold font-display px-1">
            消息列表
          </h3>
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 text-xs font-semibold hover:underline"
          >
            标记已读
          </button>
        </div>

        <div className="flex flex-col gap-0.5">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              onClick={() => openChat(msg.id, msg.name)}
              className="flex gap-4 px-4 py-4 bg-white hover:bg-slate-50 cursor-pointer border-b border-slate-100 transition-colors"
            >
              <div className="relative size-12 shrink-0">
                {msg.avatar ? (
                  <img
                    className="size-full rounded-full object-cover"
                    alt={msg.name}
                    src={msg.avatar}
                  />
                ) : msg.icon ? (
                  <div className="size-full rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <msg.icon className="w-6 h-6" />
                  </div>
                ) : null}
                
                {msg.status === "online" && (
                  <div className="absolute bottom-0 right-0 size-3 rounded-full bg-green-500 border-2 border-white"></div>
                )}
                {msg.unreadCount && msg.unreadCount > 0 && (
                  <div className="absolute top-0 right-0 size-5 flex items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold border-2 border-white">
                    {msg.unreadCount}
                  </div>
                )}
                {msg.unread && !msg.unreadCount && (
                  <div className="absolute top-0 right-0 size-3 rounded-full bg-red-500 border-2 border-white"></div>
                )}
              </div>
              <div className="flex flex-1 flex-col justify-center min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-slate-900 text-sm truncate ${msg.unread ? 'font-bold' : 'font-medium'}`}>
                    {msg.name}
                  </h4>
                  <span className={`text-[10px] ${msg.unread ? 'text-blue-600 font-medium' : 'text-slate-400'}`}>
                    {msg.time}
                  </span>
                </div>
                <p className={`text-xs truncate ${msg.unread ? 'text-slate-900 font-medium' : 'text-slate-500'}`}>
                  {msg.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
