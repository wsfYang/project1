import SchoolInfoPlatform from '../components/schoolInfoPlatform.vue'
import IncidentReport from '../components/incidentInfo.vue'
//system
import ShuttleAppointmentInfo from '../components/shuttleAppointmentInfo.vue'
import StaffInfo from  '../components/staffInfo.vue'
import ShuttleAppointment from '../components/shuttleAppointment.vue'
import ShuttleBus from '../components/shuttleBus.vue'
export default [
    {
        path: '/schoolInfoPlatform',
        component: SchoolInfoPlatform,
        meta:{
            title:"物品报修平台"
        },
        name: 'schoolInfoPlatform',
        hidden: true
    },
    {
        path: '/incidentInfo',
        component: IncidentReport,
        meta:{
            title:"保修单"
        },
        name: 'incidentInfo',
        hidden: true
    },
    {
        path: '/StaffInfo',
        component:StaffInfo,
        meta:'员工信息',
        hidden:true,
    },
    {
        path: '/ShuttleAppointment',
        component:ShuttleAppointment,
        meta:'添加预约记录',
        hidden:true,
    },
    {
        path: '/ShuttleBus',
        component:ShuttleBus,
        meta:'班车信息',
        hidden:true,
    },
    {
        path: '/ShuttleAppointmentInfo',
        component:ShuttleAppointmentInfo,
        meta:'预约信息',
        hidden:true,
    }
]
