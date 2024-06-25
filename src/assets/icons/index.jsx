import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import SearchIcon from '@mui/icons-material/Search';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { COLORS } from '../colors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import SettingsInputSvideoIcon from '@mui/icons-material/SettingsInputSvideo';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FilterVintageIcon from '@mui/icons-material/FilterVintage';
import SettingsIcon from '@mui/icons-material/Settings';
export const ICONS = {
    arrowBack: {
        component: ArrowBackIcon,
        sx: {
            color: COLORS?.secondary,
            fontSize: '30px',
            cursor: 'pointer'

        }
    },
    SearchIcon: {
        component: SearchIcon,
        sx: {
            color: COLORS.primary,
            fontSize: '25px',

        }
    },
    FullscreenIcon: {
        component: FullscreenIcon,
        sx: {
            cursor: 'pointer',
            color: COLORS.white,
            fontSize: '40px',

        }
    },
    NotificationsActiveIcon: {
        component: NotificationsActiveIcon,
        sx: {
            color: COLORS.white,
            fontSize: '25px',

        }
    },
    RemoveRedEyeIcon: {
        component: RemoveRedEyeIcon,
        sx: {
            color: COLORS?.secondary,
            // eslint-disable-next-line no-dupe-keys
            "&:hover": { color: "#000" }, color: COLORS?.secondary,
            cursor: 'pointer'
        }
    },
    BorderColorIcon: {
        component: BorderColorIcon,
        sx: {
            color: COLORS?.secondary,
            // eslint-disable-next-line no-dupe-keys
            "&:hover": { color: "#000" }, color: COLORS?.secondary,
            cursor: 'pointer'
        }
    },
    CameraAltIcon: {
        component: CameraAltIcon,
        sx: {
            color: COLORS?.secondary,
            // eslint-disable-next-line no-dupe-keys
            "&:hover": { color: "#000" }, color: COLORS?.secondary,
            cursor: 'pointer'
        }
    },
    ErrorIcon: {
        component: ErrorIcon,
        sx: {
            color: COLORS?.secondary,

        }
    },
    CheckCircleIcon: {
        component: CheckCircleIcon,

    },
    SettingsInputSvideoIcon: {
        component: SettingsInputSvideoIcon,
        sx: {
            fontSize: 40,
            cursor: 'pointer',
            color: COLORS?.secondary,

        }
    },
    DeleteForeverIcon: {
        component: DeleteForeverIcon,
        sx: {
            fontSize: 30,
            cursor: 'pointer',
            color: COLORS?.secondary,
            "&:hover": { color: "#f50057" },

        }
    },
    FilterVintageIcon: {
        component: FilterVintageIcon,
        sx: {
            fontSize: 50,
            cursor: 'pointer',
            color: COLORS?.secondary,

        }
    },
    SettingsIcon: {
        component: SettingsIcon,
        sx: {
            fontSize: 50,
            cursor: 'pointer',
            color: COLORS?.secondary,

        }
    },


}