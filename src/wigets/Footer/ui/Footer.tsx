import React from 'react'

export const Footer = () => {
  return (
   

<footer className="bg-white rounded-lg shadow-sm dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
        <a href="https://github.com/8ladimirovi4" target="_blank" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/logos/git.png" className="h-8" alt="Rs-school Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Project Source Codes</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <span  className="me-4 md:me-6">© 2023 All Rights Reserved.</span>
                </li>
            </ul>
            <a href="https://rs.school/courses/reactjs" target="_blank" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="/logos/rss-logo.svg" className="h-8" alt="Rs-school Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">RS SCHOOL</span>
            </a>
        </div>
    </div>
</footer>
  )
}

Footer.displayName = 'Footer'
