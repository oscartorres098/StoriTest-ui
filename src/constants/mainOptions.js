import PeopleIcon from '@mui/icons-material/People';
import Mail from '@mui/icons-material/Mail';
import PunchClock from '@mui/icons-material/PunchClock';
import List from '@mui/icons-material/List';


import { AllUsers } from '../pages/adminContent/user';
import { AllPresets } from '../pages/adminContent/presets';
import FileUpload from '../pages/adminContent/files';
import { CreatePreset } from '../pages/adminContent/presets/create';
import { CreateList } from '../pages/adminContent/lists/create';
import { Dashboard } from '../pages/adminContent/dashboard';


const mainOptions = [
    { name: 'Dashboard', component: <Dashboard/>  ,icon: <PeopleIcon/>, show: true },
    { name: 'Users', component: <AllUsers/>  ,icon: <PeopleIcon/>, show: true },
    { name: 'Presets', component: <AllPresets/>  ,icon: <Mail/>, show: true },
    { name: 'Presets-Create', component: <CreatePreset/>  ,icon: <Mail/>, show: false },
    { name: 'Lists', component: <CreateList/>  ,icon: <List/>, show: true },
    { name: 'Lists-create', component: <CreateList/>  ,icon: <Mail/>, show: false },

    { name: 'Scheduled', component: <AllUsers/>  ,icon: <PunchClock/>, show: true },

];

export { mainOptions };