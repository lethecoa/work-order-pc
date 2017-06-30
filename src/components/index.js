import MainLayout from './layout/MainLayout'
import ResidentInfoTable from './ResidentInfoTable/ResidentInfoTable';
// 步骤条
import OrderStep from './OrderStep/OrderStep';
// 基本信息
import BaseInfo from './BaseInfo/BaseInfo';
// 确认支付
import PayModal from './PayModal/PayModal'
// 表单项
import CarryMaterial from './formItme/CarryMaterial/CarryMaterial';
//预约居民签约
import ResidentSign from './need/BookingAgent/ResidentSign';
//预约居民体检
import ResidentInspect from './need/BookingAgent/ResidentInspect';
//预约新生儿访视 and 预约产后访视
import Newborn from './need/BookingAgent/Newborn';
//慢病随访通知
import ChronicDisease from './need/NoticeAgent/ChronicDisease';
//最新政策通知
import NewestPolicy from './need/NoticeAgent/NewestPolicy';
//最新活动通知
import NewestActivity from './need/NoticeAgent/NewestActivity';
//孕妇产检通知
import AntenatalCare from './need/NoticeAgent/AntenatalCare';
//儿童健康随访通知
import ChildHealth from './need/NoticeAgent/ChildHealth';
//用药提醒
import Medication from './need/TrackingReminder/Medication';
//高血压随访
import Hypertension from './need/ChronicDisease/Hypertension';
//糖尿病随访
import Diabetes from './need/ChronicDisease/Diabetes';
// 高血压方案一
import HypertensionA from './Hypertension/HypertensionA';
// 高血压方案二
import HypertensionB from './Hypertension/HypertensionB';
// 高血压方案三
import HypertensionC from './Hypertension/HypertensionC';
// 高血压症状
import HypertensionSymptom from './Hypertension/HypertensionSymptom';
// 糖尿病症状
import DiabetesSymptom from './Diabetes/DiabetesSymptom';
// 糖尿病方案一
import DiabetesA from './Diabetes/DiabetesA';
// 糖尿病方案二
import DiabetesB from './Diabetes/DiabetesB';
// 糖尿病方案三
import DiabetesC from './Diabetes/DiabetesC';
import EditableCell  from './Hypertension/EditableCell';
import MedicationInfo  from './Hypertension/MedicationInfo';
import Scheme from './Scheme/Scheme';

export {
	MainLayout,
	ResidentInfoTable,
	OrderStep,
	BaseInfo,
	CarryMaterial,
	PayModal,
	ResidentSign,
	ResidentInspect,
	Newborn,
	ChronicDisease,
	NewestPolicy,
	NewestActivity,
	AntenatalCare,
	ChildHealth,
	Medication,
	Hypertension,
	Diabetes,
	HypertensionA,
	HypertensionB,
	HypertensionC,
	EditableCell,
	DiabetesA,
	DiabetesB,
	DiabetesC,
	MedicationInfo,

	HypertensionSymptom,
	DiabetesSymptom,
	Scheme,

}
