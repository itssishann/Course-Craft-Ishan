import React, { useState } from 'react';
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from '../../../services/operations/authAPI';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import SidebarLinks from './SidebarLink';
import ConfirmationModal from '../../common/ConfirmationModal';
import MobileBottomBar from './MobileBottomBar';
import { VscSignOut, VscSettingsGear } from 'react-icons/vsc'; // Import icons here

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleLogout = () => {
        setConfirmationModal({
            text1: "Are you sure?",
            text2: "You will be logged out of your account.",
            btn1Text: "Logout",
            btn2Text: "Cancel",
            btn1Handler: () => {
                dispatch(logout(navigate));
                setConfirmationModal(null);
            },
            btn2Handler: () => setConfirmationModal(null),
        });
    };

    if (profileLoading || authLoading) {
        return <Loader />;
    }

    return (
        <div>
            {/* Sidebar for larger screens */}
            <div className="hidden md:flex min-w-[220px] h-[calc(100vh-3.5rem)] flex-col border-[1px] border-r-richblue-700 border-transparent py-10 bg-richblack-900">
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLinks key={link.id} link={link} iconName={link.icon} />
                        );
                    })}
                </div>
                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
                <div className="flex flex-col">
                    <SidebarLinks
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName="VscSettingsGear"
                    />
                    <button
                        onClick={handleLogout}
                        className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                            <VscSignOut className="text-lg" /> {/* Directly use the icon here */}
                            <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Bottom Bar */}
            <div className="md:hidden">
                <MobileBottomBar links={sidebarLinks} onLogout={handleLogout} />
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div>
    );
};

export default Sidebar;
