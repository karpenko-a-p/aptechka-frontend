import React, { FC } from 'react';
import { User } from 'application/models/User';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';

type Props = { user: User };

export const UserInformation: FC<Props> = ({ user }) => {
  return (
    <Link href="/profile" className="flex items-start group no-underline">
      <IconUser className="text-black group-hover:text-blue-500 transition shrink-0" />

      <div className="flex flex-col">
        <p className="group-hover:text-blue-500">{user.login}</p>
        <p className="secondary text-xs -mt-1">id: {user.id}</p>
      </div>
    </Link>
  );
};
