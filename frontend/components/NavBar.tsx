import { ConnectKitButton } from "connectkit";

import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function NavBar() {
  return (
    <div className="flex flex-row justify-end p-6">
      <ConnectKitButton theme="web95" />
    </div>
  );
}