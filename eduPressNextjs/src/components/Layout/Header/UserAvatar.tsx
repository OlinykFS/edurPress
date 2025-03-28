import { getInitials } from '@/services/utils/utils';
import Image from 'next/image';

export default function UserAvatar({ user, size = 'md' }: { user: any; size?: 'sm' | 'md' | 'lg' }) {

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-xl',
  };

  return user?.avatarUrl ? (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden border-2 border-gray-200`}>
      <Image
        src={user.avatarUrl}
        alt="User Avatar"
        width={size === 'lg' ? 64 : 48}
        height={size === 'lg' ? 64 : 48}
        className="object-cover"
      />
    </div>
  ) : (
    <div
      className={`${sizeClasses[size]} bg-black text-white rounded-full font-bold flex items-center justify-center`}
    >
      {getInitials(user?.username || '')}
    </div>
  );
}