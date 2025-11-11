import ProfileContent from "@/components/modules/profile/profile-content";
import ProfileHeader from "@/components/modules/profile/profile-header";
import { IUser } from "@/types/user.type";
import { getMe } from "@/utils/auth";

export default async function ProfilePage() {
    const data = await getMe()
    return (
        <div className="container mx-auto space-y-6 px-4 py-10">
            <ProfileHeader user={data?.data as IUser} />
            <ProfileContent user={data?.data as IUser} />
        </div>
    );
}
