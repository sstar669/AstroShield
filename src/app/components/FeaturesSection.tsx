import { ReactNode } from 'react';
import {
    RocketLaunch,
    Search,
    CalendarToday,
    Lock,
} from '@mui/icons-material';

type FeatureProps = {
    icon: ReactNode;
    title: string;
    description: string;
};

const FeatureCard = ({ icon, title, description }: FeatureProps) => (
    <div className="p-6 bg-neutral-800 rounded-lg shadow-sm text-center space-y-3">
        <div className="text-blue-400">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
    </div>
);

export default function FeaturesSection() {
    const features = [
        {
            icon: <RocketLaunch fontSize="large" />,
            title: 'Real-Time Data',
            description: 'Fetch NEOs and event data from NASA every day.',
        },
        {
            icon: <Search fontSize="large" />,
            title: 'Hazard Detection',
            description: 'Identify and filter potentially dangerous objects.',
        },
        {
            icon: <CalendarToday fontSize="large" />,
            title: 'Event Forecasting',
            description: 'View upcoming events for the next 7 days.',
        },
        {
            icon: <Lock fontSize="large" />,
            title: 'Secure Authentication',
            description: 'Login with Supabase and protect your data.',
        },
    ];

    return (
        <section className="flex flex-col items-center justify-center py-20 px-4 bg-neutral-900 min-h-[50vh]">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-12">Features</h2>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f, i) => (
                        <FeatureCard key={i} {...f} />
                    ))}
                </div>
            </div>
        </section>
    );
}
