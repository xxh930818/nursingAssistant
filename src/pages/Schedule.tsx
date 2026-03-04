import { useState } from "react";
import { ArrowLeft, Calendar as CalendarIcon, Clock, MapPin, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import BottomNav from "@/components/BottomNav";

export default function Schedule() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(15);
  const [currentMonth, setCurrentMonth] = useState("2023年10月");

  const handleAction = (action: string) => {
    toast.info(`正在打开${action}...`);
  };

  const dates = Array.from({ length: 7 }, (_, i) => i + 12); // 12 to 18

  const scheduleData = [
    {
      id: 1,
      time: "09:30 - 11:00",
      patient: "张建国",
      type: "三级护理",
      location: "朝阳区幸福路12号",
      status: "pending",
    },
    {
      id: 2,
      time: "14:00 - 16:30",
      patient: "李淑芬",
      type: "康复训练",
      location: "海淀区中关村南大街5号",
      status: "completed",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white shadow-xl overflow-x-hidden pb-20">
      {/* Header */}
      <div className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-slate-100 justify-between">
        <div
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </div>
        <h2 className="text-slate-900 text-lg font-bold leading-tight tracking-tight flex-1 text-center">
          我的日程
        </h2>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => handleAction("日历视图")}
            className="flex cursor-pointer items-center justify-center rounded-lg h-10 w-10 bg-transparent text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <CalendarIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Calendar Strip */}
        <div className="bg-white px-4 py-3 border-b border-slate-100 sticky top-[73px] z-10">
          <div className="flex items-center justify-between mb-4">
            <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>
            <span className="font-bold text-slate-900">{currentMonth}</span>
            <button className="p-1 hover:bg-slate-100 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>
          <div className="flex justify-between">
            {["一", "二", "三", "四", "五", "六", "日"].map((day, i) => {
              const date = dates[i];
              const isSelected = selectedDate === date;
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedDate(date);
                    toast.success(`已切换到 ${currentMonth}${date}日`);
                  }}
                  className={`flex flex-col items-center justify-center w-10 h-14 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-[10px] ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    {day}
                  </span>
                  <span className={`text-base font-bold mt-0.5 ${isSelected ? "text-white" : "text-slate-900"}`}>
                    {date}
                  </span>
                  {date === 15 && !isSelected && (
                    <div className="w-1 h-1 bg-blue-600 rounded-full mt-1"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Schedule List */}
        <div className="p-4 space-y-4">
          {selectedDate === 15 ? (
            scheduleData.map((item) => (
              <div 
                key={item.id}
                onClick={() => navigate(`/order/${item.id}`)}
                className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-slate-900">{item.time}</span>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                    item.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {item.status === 'pending' ? '待服务' : '已完成'}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700 font-medium">{item.patient}</span>
                    <span className="text-xs text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{item.type}</span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span className="text-slate-600 line-clamp-2">{item.location}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-slate-50">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAction("联系家属");
                    }}
                    className="flex-1 py-2 text-sm font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    联系家属
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (item.status === 'pending') {
                        navigate(`/order/${item.id}`);
                      } else {
                        handleAction("查看记录");
                      }
                    }}
                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                      item.status === 'pending' 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {item.status === 'pending' ? '去签到' : '查看记录'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <CalendarIcon className="w-12 h-12 mb-4 opacity-20" />
              <p>该日期暂无日程安排</p>
            </div>
          )}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
