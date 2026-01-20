import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Pod {
    name: string;
    namespace: string;
    status: string;
    controlledBy: string;
    isReady: boolean;
    labels: string[];
    dateTimeCreated: string;
}

interface PodContextType {
    pods: Pod[];
    setPods: (pods: Pod[]) => void;
    selectedCluster: string | null;
    setSelectedCluster: (cluster: string | null) => void;
}

const PodContext = createContext<PodContextType | undefined>(undefined);

export const usePods = () => {
    const context = useContext(PodContext);
    if (context === undefined) {
        throw new Error('usePods must be used within a PodProvider');
    }
    return context;
};

interface PodProviderProps {
    children: ReactNode;
}

export const PodProvider: React.FC<PodProviderProps> = ({ children }) => {
    const [pods, setPods] = useState<Pod[]>([]);
    const [selectedCluster, setSelectedCluster] = useState<string | null>(null);

    return (
        <PodContext.Provider value={{ pods, setPods, selectedCluster, setSelectedCluster }}>
            {children}
        </PodContext.Provider>
    );
};
