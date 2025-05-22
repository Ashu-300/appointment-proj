import React from 'react'
import {Link} from 'react-router-dom'

const SideBar = () => {
      return (
        <div className="max-w-[20%] h-screen bg-gradient-to-b from-blue-50 to-white shadow-lg flex flex-col w-fit">
          {/* Salon Name */}
          <div className="p-6 text-center">
            <h1 className="text-2xl font-bold text-blue-800">Salon Snap</h1>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              <li>
                <Link
                  href="#dashboard"
                  className="flex items-center p-3 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7m-9 2v7h4v-7m-4 0H5z" />
                  </svg>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#booked-appointments"
                  className="flex items-center p-3 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Booked Appointments
                </Link>
              </li>
              <li>
                <Link
                  href="#new-appointments"
                  className="flex items-center p-3 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  New Appointments
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      );
    };

export default SideBar
