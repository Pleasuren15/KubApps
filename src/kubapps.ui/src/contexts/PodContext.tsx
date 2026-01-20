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
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    filteredPods: Pod[];
    selectedNamespace: string;
    setSelectedNamespace: (namespace: string) => void;
    availableNamespaces: string[];
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
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedNamespace, setSelectedNamespace] = useState('all');
    const itemsPerPage = 9;

    // Get unique namespaces from pods
    const availableNamespaces = useMemo(() => {
        const namespaces = [...new Set(pods.map(pod => pod.namespace))].sort();
        return namespaces;
    }, [pods]);

    // Filter pods based on search term and namespace
    const filteredPods = useMemo(() => {
        let filtered = pods;
        
        // Filter by namespace
        if (selectedNamespace !== 'all') {
            filtered = filtered.filter(pod => pod.namespace === selectedNamespace);
        }
        
        // Filter by search term
        if (searchTerm.trim()) {
            filtered = filtered.filter(pod => 
                pod.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pod.namespace.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pod.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pod.controlledBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pod.labels.some(label => label.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }
        
        return filtered;
    }, [pods, searchTerm, selectedNamespace]);

    const totalPages = useMemo(() => Math.ceil(filteredPods.length / itemsPerPage), [filteredPods.length]);
    
    const paginatedPods = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredPods.slice(startIndex, endIndex);
    }, [filteredPods, currentPage]);

    // Reset to page 1 when cluster changes, search term changes, or namespace changes
    const setSelectedClusterWithReset = (cluster: string | null) => {
        setSelectedCluster(cluster);
        setCurrentPage(1);
        setSelectedNamespace('all'); // Reset namespace filter when changing clusters
    };

    const setSearchTermWithReset = (term: string) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const setSelectedNamespaceWithReset = (namespace: string) => {
        setSelectedNamespace(namespace);
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
            paginatedPods,
            isLoading,
            setIsLoading,
            searchTerm,
            setSearchTerm: setSearchTermWithReset,
            filteredPods,
            selectedNamespace,
            setSelectedNamespace: setSelectedNamespaceWithReset,
            availableNamespaces
        }}>
            {children}
        </PodContext.Provider>
    );
};
