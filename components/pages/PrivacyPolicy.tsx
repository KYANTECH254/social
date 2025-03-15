"use client";
import Back from "../Buttons/Back";

const privacyPolicy = [
    { id: 1, title: "Data Collection", description: "We collect personal data, including your name, email address, profile photos, location, and any content you share on the app. We also gather information through cookies and device data to enhance your experience." },
    { id: 2, title: "Use of Data", description: "Your data is used to provide and improve our services, personalize your experience, and communicate important updates. We may also use data for analytics and marketing, but only with your consent." },
    { id: 3, title: "Data Sharing", description: "We do not sell your personal data. However, we may share it with trusted service providers, legal authorities (when required by law), and partners for service improvement. Users will be informed and asked for consent where necessary." },
    { id: 4, title: "User Rights", description: "You have the right to access, correct, or delete your personal data at any time. To exercise these rights, contact our support team via (ibrahimoganga8@gmail.com)." },
    { id: 5, title: "Security Measures", description: "We implement strong security measures, including encryption and secure servers, to protect your data. In the event of a data breach, we will promptly notify affected users." },
    { id: 6, title: "Cookies and Tracking", description: "Our app uses cookies and similar technologies for functionality, analytics, and advertising. You can manage your cookie preferences in the app settings." },
    { id: 7, title: "Children’s Privacy", description: "Users under the age of 13 are not permitted to use the app. We do not knowingly collect data from children. If we discover such data, it will be deleted immediately." }
];

export default function PrivacyPolicy() {
    return (
        <div className="first-container">
            <Back title="Privacy Policy" />
            <div className="mx-auto p-6 text-[var(--main-text-color)] bg-[var(--main-background-color)]">
                <p className="mb-4">We are committed to protecting user privacy. This policy outlines how we collect, use, and protect your data.</p>
                {privacyPolicy.map(policy => (
                    <div key={policy.id} className="mb-4">
                        <h2 className="text-xl font-semibold mt-4 mb-2">{policy.id}. {policy.title}</h2>
                        <p>{policy.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}