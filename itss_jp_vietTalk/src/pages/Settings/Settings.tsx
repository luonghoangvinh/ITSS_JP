import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Languages, Shield, BellRing, Globe, Camera, Mail, Lock, ShieldCheck } from 'lucide-react';
import './Settings.css';
import { getAccount, updateAccount, deleteAccount } from '../../services/AccountService';

export function Settings() {
    const navigate = useNavigate();
    // Form states
    const [userId] = useState(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            return parseInt(storedUserId, 10);
        }
        
        // Dự phòng: thử lấy ID từ token nếu localStorage.userId bị thiếu
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const base64Url = token.split('.')[1];
                const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                const jsonPayload = decodeURIComponent(
                    window.atob(base64).split('').map(function(c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join('')
                );
                const payload = JSON.parse(jsonPayload);
                return payload.sub ? parseInt(payload.sub, 10) : 1;
            } catch (e) {
                console.error("Lỗi giải mã token", e);
            }
        }
        return 1; // Dự phòng là 1 nếu chưa có
    });
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [introduction, setIntroduction] = useState("");
    const [gmail, setGmail] = useState("");

    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [dailyReminder, setDailyReminder] = useState(true);
    const [newCourseNotif, setNewCourseNotif] = useState(true);
    const [weeklyReport, setWeeklyReport] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Fetch user data from DB on component mount
    useEffect(() => {
        const fetchAccount = async () => {
            try {
                const data = await getAccount(userId);
                if (data) {
                    setFullName(data.fullName || "");
                    setUserName(data.userName || "");
                    setIntroduction(data.introduction || "");
                    setGmail(data.gmail || "");
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu người dùng:", error);
            }
        };
        fetchAccount();
    }, [userId]);

    const handleEmailChangeClick = async () => {
        const newEmail = window.prompt("新しいメールアドレスを入力してください (Nhập email mới):", gmail);
        if (!newEmail) return;
        try {
            await updateAccount(userId, { gmail: newEmail });
            setGmail(newEmail);
            alert('メールアドレスが正常に変更されました！ (Đổi email thành công!)');
        } catch (error: any) {
            console.error(error);
            alert("Lỗi khi thay đổi email!");
        }
    };

    const handlePasswordChangeClick = async () => {
        const newPassword = window.prompt("新しいパスワードを入力してください (Nhập mật khẩu mới):");
        if (!newPassword) return;
        try {
            await updateAccount(userId, { password: newPassword, lastPasswordChange: new Date() });
            alert('パスワードが正常に変更されました！ (Đổi mật khẩu thành công!)');
        } catch (error: any) {
            console.error(error);
            alert("Lỗi khi thay đổi mật khẩu!");
        }
    };

    const handleSaveChanges = async () => {
        try {
            await updateAccount(userId, { fullName, userName, introduction });
            alert("Thay đổi đã được lưu thành công!");
            setHasChanges(false);
        } catch (error) {
            console.error("Lỗi khi lưu:", error);
            alert("Có lỗi xảy ra khi lưu thông tin.");
        }
    };

    const handleDeleteAccount = async () => {
        const isConfirmed = window.confirm("本当にアカウントを削除しますか？この操作は元に戻せません。\n(Bạn có chắc chắn muốn xóa tài khoản không? Hành động này không thể hoàn tác.)");
        if (isConfirmed) {
            try {
                await deleteAccount(userId);
                localStorage.removeItem('access_token');
                localStorage.removeItem('userId');
                alert("アカウントが削除されました。(Tài khoản đã được xóa)");
                navigate('/login');
            } catch (error) {
                console.error("Lỗi khi xóa tài khoản:", error);
                alert("アカウントの削除中にエラーが発生しました。(Có lỗi xảy ra khi xóa tài khoản.)");
            }
        }
    };

    return (
        <div className="settings-container bg-[#FEF6F6] min-h-screen p-10 relative pb-28">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black text-[#B91C1C] mb-1">設定</h1>
                    <p className="text-xs text-gray-500 font-bold">パーソナライズ</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="マイルストーンを検索..." 
                            className="pl-10 pr-4 py-2.5 bg-[#F5E6E6] rounded-full text-xs font-bold text-gray-700 outline-none w-64 border border-transparent focus:border-[#B91C1C]/20 transition-all"
                        />
                    </div>
                    <button className="p-2.5 text-gray-600 hover:bg-[#F5E6E6] rounded-full transition-colors"><Bell size={20} /></button>
                    <button className="p-2.5 text-gray-600 hover:bg-[#F5E6E6] rounded-full transition-colors"><Languages size={20} /></button>
                </div>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-3xl p-8 mb-6 shadow-sm border border-[#FFE4E4]">
                <h2 className="text-xl font-bold text-gray-900 mb-1">プロフィール</h2>
                <p className="text-xs text-gray-500 mb-6 font-bold">個人情報とプロフィール写真を更新します。</p>
                
                <div className="flex gap-10">
                    <div className="relative shrink-0">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#F5E6E6]">
                            <img src="https://placehold.co/150x150/e2e8f0/64748b?text=Avatar" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <button className="absolute bottom-1 right-1 p-1.5 bg-white border border-gray-200 rounded-full text-[#B91C1C] shadow-sm hover:bg-gray-50 transition-colors">
                            <Camera size={16} />
                        </button>
                    </div>
                    
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">フルネーム</label>
                            <input type="text" value={fullName} onChange={(e) => { setFullName(e.target.value); setHasChanges(true); }} className="w-full p-3.5 bg-[#F5E6E6] rounded-2xl text-sm font-medium text-gray-800 outline-none border border-transparent focus:border-[#B91C1C]/30 transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">ユーザー名</label>
                            <input type="text" value={userName} onChange={(e) => { setUserName(e.target.value); setHasChanges(true); }} className="w-full p-3.5 bg-[#F5E6E6] rounded-2xl text-sm font-medium text-gray-800 outline-none border border-transparent focus:border-[#B91C1C]/30 transition-all" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">自己紹介</label>
                            <textarea rows={2} value={introduction} onChange={(e) => { setIntroduction(e.target.value); setHasChanges(true); }} className="w-full p-3.5 bg-[#F5E6E6] rounded-2xl text-sm font-medium text-gray-800 outline-none border border-transparent focus:border-[#B91C1C]/30 resize-none transition-all"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            {/* Account Security Card */}
            <div className="bg-[#FFF5F5] rounded-3xl p-8 mb-6 shadow-sm border border-[#FFE4E4]">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#FFE4E4] p-2.5 rounded-xl text-[#B91C1C]">
                        <Shield size={20} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">アカウントセキュリティ</h2>
                        <p className="text-xs text-gray-500 font-bold">学習進捗と個人情報を保護します。</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-[#FFE4E4]">
                        <div className="flex items-center gap-4">
                            <Mail className="text-[#B91C1C]" size={20} />
                            <div>
                                <p className="text-sm font-bold text-gray-800">メールアドレス</p>
                                <p className="text-xs text-gray-500">{gmail || "未設定 (Chưa thiết lập)"}</p>
                            </div>
                        </div>
                        <button onClick={handleEmailChangeClick} className="text-xs font-black text-[#B91C1C] hover:underline bg-[#FFE4E4] px-4 py-1.5 rounded-full">変更</button>
                    </div>
                    
                    <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-[#FFE4E4]">
                        <div className="flex items-center gap-4">
                            <Lock className="text-[#B91C1C]" size={20} />
                            <div>
                                <p className="text-sm font-bold text-gray-800">パスワード</p>
                                <p className="text-xs text-gray-500">最終更新: 3ヶ月前</p>
                            </div>
                        </div>
                        <button onClick={handlePasswordChangeClick} className="text-xs font-black text-[#B91C1C] hover:underline bg-[#FFE4E4] px-4 py-1.5 rounded-full">変更</button>
                    </div>

                    <div className="flex items-center justify-between p-5 bg-white rounded-3xl border border-[#FFE4E4]">
                        <div className="flex items-center gap-4">
                            <ShieldCheck className="text-[#B91C1C]" size={20} />
                            <div>
                                <p className="text-sm font-bold text-gray-800">二要素認証</p>
                                <p className="text-xs text-gray-500">セキュリティ層を追加して保護を強化します。</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                        <input type="checkbox" checked={is2FAEnabled} onChange={(e) => { setIs2FAEnabled(e.target.checked); setHasChanges(true); }} />
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Notifications and Localization Grid */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Notifications */}
                <div className="bg-[#FFF5F5] rounded-3xl p-8 shadow-sm border border-[#FFE4E4]">
                    <div className="flex items-center gap-4 mb-8">
                        <BellRing className="text-yellow-600" size={24} />
                        <h2 className="text-lg font-bold text-gray-900">通知</h2>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-700">毎日リマインダー</span>
                            <label className="toggle-switch">
                            <input type="checkbox" checked={dailyReminder} onChange={(e) => { setDailyReminder(e.target.checked); setHasChanges(true); }} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-700">新コースのお知らせ</span>
                            <label className="toggle-switch">
                            <input type="checkbox" checked={newCourseNotif} onChange={(e) => { setNewCourseNotif(e.target.checked); setHasChanges(true); }} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-700">週次進捗レポート</span>
                            <label className="toggle-switch">
                            <input type="checkbox" checked={weeklyReport} onChange={(e) => { setWeeklyReport(e.target.checked); setHasChanges(true); }} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Localization */}
                <div className="flex flex-col gap-6">
                    <div className="bg-[#FFF5F5] rounded-3xl p-8 shadow-sm border border-[#FFE4E4] flex flex-col flex-1">
                        <div className="flex items-center gap-4 mb-6">
                            <Globe className="text-green-600" size={24} />
                            <h2 className="text-lg font-bold text-gray-900">ローカライズ</h2>
                        </div>
                        <div className="space-y-5 flex-1">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">アプリの言語</label>
                                <select onChange={() => setHasChanges(true)} className="w-full p-3.5 bg-white rounded-2xl text-sm font-bold text-gray-700 border border-[#FFE4E4] outline-none hover:border-[#B91C1C]/30 transition-all cursor-pointer">
                                    <option>日本 (JP)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5">タイムゾーン</label>
                                <select onChange={() => setHasChanges(true)} className="w-full p-3.5 bg-white rounded-2xl text-sm font-bold text-gray-700 border border-[#FFE4E4] outline-none hover:border-[#B91C1C]/30 transition-all cursor-pointer">
                                    <option>(GMT+07:00) ホーチミン市</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button className="w-full py-4 bg-[#B91C1C] hover:bg-[#991b1b] text-white rounded-full font-bold transition-colors shadow-md">
                        学習成績
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="flex items-center justify-between bg-[#FFF5F5] rounded-3xl p-8 shadow-sm border border-[#FFE4E4]">
                <div>
                    <h2 className="text-lg font-bold text-[#B91C1C] mb-1">危険地帯</h2>
                    <p className="text-xs text-gray-500 font-bold">アカウントを削除すると元に戻せません。本当に実行しますか？</p>
                </div>
                <button onClick={handleDeleteAccount} className="px-8 py-3 border-2 border-[#B91C1C] text-[#B91C1C] rounded-full font-bold text-sm hover:bg-[#FFE4E4] transition-colors">
                    アカウントを削除
                </button>
            </div>

            {/* Floating Bottom Bar */}
            {hasChanges && (
                <div className="fixed bottom-6 left-[200px] right-0 mx-auto w-[80%] max-w-4xl bg-white rounded-full px-8 py-4 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 flex items-center justify-between z-50">
                    <p className="text-sm font-bold text-gray-600">保存されていない変更があります。</p>
                    <div className="flex items-center gap-6">
                        <button className="text-sm font-bold text-gray-600 hover:text-gray-900" onClick={() => setHasChanges(false)}>
                            破棄する
                        </button>
                        <button className="px-8 py-2.5 bg-[#B91C1C] hover:bg-[#991b1b] text-white rounded-full text-sm font-bold transition-colors shadow-md shadow-red-200" onClick={handleSaveChanges}>
                            変更を保存
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}