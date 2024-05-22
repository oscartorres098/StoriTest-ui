import PeopleIcon from '@mui/icons-material/People';
import Mail from '@mui/icons-material/Mail';
import PunchClock from '@mui/icons-material/PunchClock';
import FileCopy from '@mui/icons-material/FileCopy';


import { AllUsers } from '../pages/adminContent/user';
import { AllPresets } from '../pages/adminContent/presets';
import FileUpload from '../pages/adminContent/files';


const mainOptions = [
    { name: 'Users', component: <AllUsers/>  ,icon: <PeopleIcon/>, show: true },
    { name: 'Files', component: <FileUpload/>  ,icon: <FileCopy/>, show: true },
    { name: 'Presets', component: <AllPresets/>  ,icon: <Mail/>, show: true },
    { name: 'Presets-Create', component: <AllPresets/>  ,icon: <Mail/>, show: false },
    { name: 'Schedule', component: <AllUsers/>  ,icon: <PunchClock/>, show: true },

];

export { mainOptions };