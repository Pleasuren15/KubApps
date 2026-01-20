import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';

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
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    totalPages: number;
    paginatedPods: Pod[];
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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const totalPages = useMemo(() => Math.ceil(pods.length / itemsPerPage), [pods.length]);
    
    const paginatedPods = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return pods.slice(startIndex, endIndex);
    }, [pods, currentPage]);

    // Reset to page 1 when cluster changes
    const setSelectedClusterWithReset = (cluster: string | null) => {
        setSelectedCluster(cluster);
        setCurrentPage(1);
    };

    return (
        <PodContext.Provider value={{ 
            pods, 
            setPods, 
            selectedCluster, 
            setSelectedCluster: setSelectedClusterWithReset, 
            currentPage, 
            setCurrentPage, 
            itemsPerPage, 
            totalPages, 
            paginatedPods 
        }}>
            {children}
        </PodContext.Provider>
    );
};
