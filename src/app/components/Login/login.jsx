"use client";
import Modal from '@mui/material/Modal';
import s from "./login.module.scss"
import useEnterToNeshan from "../../hooks/useEnterToNeshan";
import Loading from "../Loading/Loading"
export default function Login() {
    const {openNeshanPopup,visible} = useEnterToNeshan()
    const renderWaitingModal = () => (
        <Modal
            open={visible}
        >
            <div className={s.modalForWaiting}>
                <div className={s.loading}>
                   <Loading/>
                </div>
                <div className={s.main}>
                    <div className={s.title}>در حال انتقال به داشبورد</div>
                    <div className={s.wait}> لطفا منتظر بمانید</div>
                </div>
            </div>
        </Modal>
    );
    return (<>
            <div className={s.container}>
                <div  style={{ marginLeft: '0px', marginRight: '0px' }}>
                    <div
                    >
                        <div className={s.logo_min} />
                        <h2 className={s.text_welcome}>
                            به سیستم یکپارچه مدیریت ارتباط با مشتریان
                            خوش‌آمدید
                        </h2>
                        <button
                            type="primary"
                            onClick={openNeshanPopup}
                        >
                            <i className={s.icon} />
                            ورود از طریق نشان
                        </button>
                    </div>
                    <div className={s.pic_holder}>
                        <div className={s.left_pic} />
                    </div>
                </div>
                <p className={s.paragraphLeggal}>
                    تمامی حقوق مادی و معنوی این وبسایت متعلق به مجموعه لوانت است. حق کپی
                    رایت محفوظ است. فروردین ۱۴۰۰
                </p>
            </div>
            {renderWaitingModal()}
        </>
    )
}
