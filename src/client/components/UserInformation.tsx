import React, { FC } from 'react';
import { IUser } from 'server/models/User';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';

export const UserInformation: FC<IUser> = ({ id, login }) => {
  return (
    <Link href="/profile" className="flex items-start group no-underline">
      <IconUser className="text-black group-hover:text-blue-500 transition shrink-0" />

      <div className="flex flex-col">
        <p className="group-hover:text-blue-500">{login}</p>
        <p className="secondary text-xs -mt-1">id: {id}</p>
      </div>
    </Link>
  );
};
