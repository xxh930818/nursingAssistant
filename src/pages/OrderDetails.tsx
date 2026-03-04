import { useState } from "react";
import { ArrowLeft, MapPin, Camera, History, Activity, Utensils, Pill, Navigation, ChevronRight } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useApp } from "@/context/AppContext";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getOrderById, updateOrderStatus, addVitalSigns, addMealRecord, addMedicationRecord } = useApp();

  const order = getOrderById(id || '1');

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>订单不存在</p>
      </div>
    );
  }

  const [status, setStatus] = useState<"pending" | "serving" | "completed">(order.status);

  const handleAction = (action: string) => {
    switch(action) {
      case "位置打卡":
        toast.success("位置打卡成功");
        break;
      case "拍照上传":
        toast.success("照片已上传");
        break;
      case "打卡记录":
        toast.info("查看打卡记录");
        break;
      case "生命体征记录":
        // 模拟添加生命体征记录
        const newVitalSigns = {
          id: Date.now().toString(),
          orderId: order.id,
          timestamp: new Date().toISOString(),
          bloodPressure: { systolic: 120, diastolic: 80 },
          heartRate: 72,
          temperature: 36.5,
          oxygenSaturation: 98
        };
        addVitalSigns(newVitalSigns);
        toast.success("生命体征记录已保存");
        break;
      case "饮食进食记录":
        const newMealRecord = {
          id: Date.now().toString(),
          orderId: order.id,
          timestamp: new Date().toISOString(),
          mealType: 'breakfast' as const,
          foodItems: ['粥', '鸡蛋'],
          intakeAmount: 'full' as const,
          appetite: 'good' as const
        };
        addMealRecord(newMealRecord);
        toast.success("饮食记录已保存");
        break;
      case "用药记录":
        const newMedicationRecord = {
          id: Date.now().toString(),
          orderId: order.id,
          timestamp: new Date().toISOString(),
          medicationName: '常规药物',
          dosage: '10mg',
          administered: true
        };
        addMedicationRecord(newMedicationRecord);
        toast.success("用药记录已保存");
        break;
      default:
        toast.info(`正在打开${action}...`);
    }
  };

  const handleCheckIn = () => {
    if (status === "pending") {
      setStatus("serving");
      updateOrderStatus(order.id, "serving");
      toast.success("签到成功，服务已开始");
    } else if (status === "serving") {
      setStatus("completed");
      updateOrderStatus(order.id, "completed");
      toast.success("服务已完成");
      setTimeout(() => navigate("/"), 1500);
    }
  };

  const handleReject = () => {
    toast.error("已拒绝该工单");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white shadow-xl overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-slate-100">
        <div
          onClick={() => navigate(-1)}
          className="text-slate-900 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center pr-10">工单详情</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Patient Info Card */}
        <div className="p-4">
          <div className="flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm border border-slate-100">
            <div className="flex items-center gap-4">
              <div
                className="size-16 rounded-full bg-cover bg-center border-2 border-blue-600/20"
                style={{
                  backgroundImage: `url("${order.patient.avatar}")`,
                }}
              ></div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{order.patient.name}</h3>
                  {status === "serving" && (
                    <span className="px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-bold animate-pulse">
                      服务中
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-blue-600/10 text-blue-600 text-xs font-semibold">
                    {order.patient.age}岁
                  </span>
                  <span className="px-2 py-0.5 rounded bg-orange-100 text-orange-700 text-xs font-semibold">
                    {order.patient.nursingLevel}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div>
                <p className="text-slate-500 text-xs">服务地点</p>
                <p className="text-sm font-medium mt-0.5">{order.address}</p>
              </div>
              <div>
                <p className="text-slate-500 text-xs">计划时间</p>
                <p className="text-sm font-medium mt-0.5">今天 {order.scheduledTime.startTime} - {order.scheduledTime.endTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="px-4 py-2">
          <h3 className="text-base font-bold mb-3">服务签到</h3>
          <div className="grid grid-cols-3 gap-3">
            <button 
              onClick={() => handleAction("位置打卡")}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors active:scale-95"
            >
              <MapPin className="text-blue-600 w-6 h-6" />
              <span className="text-xs font-medium">位置打卡</span>
            </button>
            <button 
              onClick={() => handleAction("拍照上传")}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors active:scale-95"
            >
              <Camera className="text-blue-600 w-6 h-6" />
              <span className="text-xs font-medium">拍照上传</span>
            </button>
            <button 
              onClick={() => handleAction("打卡记录")}
              className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors active:scale-95"
            >
              <History className="text-blue-600 w-6 h-6" />
              <span className="text-xs font-medium">打卡记录</span>
            </button>
          </div>
        </div>

        {/* Nursing Record Forms Section */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold">护理记录单</h3>
            <button 
              onClick={() => handleAction("全部记录单")}
              className="text-xs text-blue-600 font-medium hover:underline"
            >
              查看全部
            </button>
          </div>

          <div className="space-y-3">
            {/* Form Item 1 */}
            <div 
              onClick={() => handleAction("生命体征记录")}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="size-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Activity className="text-blue-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">生命体征记录</p>
                <p className="text-xs text-slate-500">测量血压、体温、脉搏</p>
              </div>
              <ChevronRight className="text-slate-300 w-5 h-5" />
            </div>

            {/* Form Item 2 */}
            <div 
              onClick={() => handleAction("饮食进食记录")}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="size-10 rounded-lg bg-green-50 flex items-center justify-center">
                <Utensils className="text-green-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">饮食进食记录</p>
                <p className="text-xs text-slate-500">记录早餐/午餐摄入情况</p>
              </div>
              <ChevronRight className="text-slate-300 w-5 h-5" />
            </div>

            {/* Form Item 3 */}
            <div 
              onClick={() => handleAction("用药记录")}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="size-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Pill className="text-purple-600 w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">用药记录</p>
                <p className="text-xs text-slate-500">待记录（上次 08:00）</p>
              </div>
              <ChevronRight className="text-slate-300 w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Location Map Mini */}
        <div className="px-4 py-2 mb-4">
          <div className="w-full h-32 rounded-xl overflow-hidden relative">
            <img
              className="w-full h-full object-cover"
              alt="Map"
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800"
            />
            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
              <div className="bg-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                <Navigation className="text-blue-600 w-4 h-4" />
                <span className="text-xs font-bold text-slate-900">距离患者 200m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fixed Action Bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 p-4 pb-6">
        <div className="flex gap-3">
          {status === "pending" ? (
            <>
              <button 
                onClick={handleReject}
                className="flex-1 flex items-center justify-center h-12 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition-colors"
              >
                拒绝
              </button>
              <button 
                onClick={handleCheckIn}
                className="flex-[2_2_0px] flex items-center justify-center h-12 rounded-xl bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors active:scale-[0.98]"
              >
                立即签到
              </button>
            </>
          ) : (
            <button 
              onClick={handleCheckIn}
              className="w-full flex items-center justify-center h-12 rounded-xl bg-green-500 text-white font-bold shadow-lg shadow-green-500/30 hover:bg-green-600 transition-colors active:scale-[0.98]"
            >
              完成服务
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
