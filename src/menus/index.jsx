
import SchoolIcon from '@mui/icons-material/School';
import DevicesIcon from '@mui/icons-material/Devices';
import SubjectIcon from '@mui/icons-material/Subject';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const SideBarMenu = [
    { path: "/admin", icon: SchoolIcon, text: 'Eduction', subMenuItems: [] },
    // { path: "#", icon: Dashboard, text: 'Profile', subMenuItems: [{ subMenu: 'Submenu', path: '/demo' }, { subMenu: 'Submenu', path: '#' }] },
    { path: "/admin/skill", icon: DevicesIcon, text: 'Skill', subMenuItems: [] },
    { path: "/admin/project", icon: DeveloperModeIcon, text: 'Projects', subMenuItems: [] },
    { path: "/admin/profile", icon: AssignmentIndIcon, text: 'profile', subMenuItems: [] },
    { path: "/admin/youtube", icon: AssignmentIndIcon, text: 'youtube', subMenuItems: [] },

];

