"use client";

import Back from "../Buttons/Back";

const terms = [
    { id: 1, title: "Users must agree", description: "Users must agree to these terms and conditions before accessing or using the app." },
    { id: 2, title: "Minimum Age", description: "Users must be at least 13 years old (or the applicable age in their jurisdiction) to use the app." },
    { id: 3, title: "Account Security", description: "Users are responsible for maintaining the confidentiality of their account information and passwords." },
    { id: 4, title: "User Content Rights", description: "Users retain ownership of the content they post but grant the app a license to use, display, and distribute it." },
    { id: 5, title: "App Intellectual Property", description: "The app retains ownership of its intellectual property, including trademarks, logos, and content." },
    { id: 6, title: "Prohibited Content", description: "Users are prohibited from posting content that is illegal, offensive, harmful, or violates the rights of others." },
    { id: 7, title: "Privacy Policy", description: "The app collects and processes personal data in accordance with its Privacy Policy." },
    { id: 8, title: "Content Licensing", description: "By posting content, users grant the app a worldwide, non-exclusive, royalty-free license to use, reproduce, and display that content." },
    { id: 9, title: "User Behavior", description: "Users must behave respectfully and are prohibited from harassing, abusing, or threatening others." },
    { id: 10, title: "Account Termination", description: "The app reserves the right to suspend or terminate accounts that violate these terms." },
    { id: 11, title: "Liability Disclaimer", description: "The app is not liable for any damages or losses resulting from the use of the platform." },
    { id: 12, title: "Service Availability", description: "The app provides its services 'as is' and does not guarantee they will be error-free or uninterrupted." },
    { id: 13, title: "Fraudulent Activities", description: "Users may not use the app to engage in fraudulent activities or impersonate others." },
    { id: 14, title: "Service Modifications", description: "The app may modify or discontinue its services at any time without prior notice." },
    { id: 15, title: "Content Ownership", description: "Users are responsible for ensuring that the content they share does not infringe upon third-party rights." },
    { id: 16, title: "Content Removal", description: "The app may remove or restrict access to any content that violates its policies." },
    { id: 17, title: "Security Violations", description: "Users must not attempt to hack, disrupt, or compromise the security of the app." },
    { id: 18, title: "Governing Law", description: "Disputes arising from these terms will be governed by the laws of the specified jurisdiction." },
    { id: 19, title: "Terms Updates", description: "The app may update these terms at any time, and continued use constitutes acceptance of the updated terms." },
    { id: 20, title: "Severability", description: "If any part of these terms is deemed invalid or unenforceable, the remaining provisions will remain in effect." }
];

export default function Terms() {
    return (
        <div className="first-container">
            <Back title="Terms and Conditions" />
            <div className="mx-auto p-6 text-[var(--main-text-color)] bg-[var(--main-background-color)]">
                {/* <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1> */}
                <p className="mb-4">Welcome to our platform. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions.</p>
                {terms.map(term => (
                    <div key={term.id} className="mb-4">
                        <h2 className="text-xl font-semibold mt-4 mb-2">{term.id}. {term.title}</h2>
                        <p>{term.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
