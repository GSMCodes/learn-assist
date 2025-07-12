import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>
          Please note: Preferred input format: Subject_name: topic-1, topic-2...
        </p>
        <Link href={'https://github.com/GSMCodes'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">Made by GSMCodes</Link>
        </footer>
    )
}

export default Footer;