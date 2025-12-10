// Types redefined locally to avoid build path issues


// Ideally, shared types should be in a shared package or copied. 
// For this task, I will redefine them here to avoid path issues if directories are strict.
export type BiomarkerCategory = 'metabolic' | 'cardiovascular' | 'hormonal';
export type BiomarkerStatus = 'normal' | 'high' | 'low';

export interface Biomarker {
    id: string;
    patientId: string;
    name: string;
    value: number;
    unit: string;
    category: BiomarkerCategory;
    range: {
        min: number;
        max: number;
    };
    measuredAt: string;
    status: BiomarkerStatus;
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    lastVisit: string;
}

export interface AnalysisResult {
    summary: string;
    risks: string[];
    recommendations: string[];
}

const API_Base = 'http://localhost:3001/api';

export const api = {
    getPatients: async (): Promise<Patient[]> => {
        const res = await fetch(`${API_Base}/patients`);
        return res.json();
    },
    getPatient: async (id: string): Promise<Patient> => {
        const res = await fetch(`${API_Base}/patients/${id}`);
        return res.json();
    },
    getBiomarkers: async (patientId: string, category?: string): Promise<Biomarker[]> => {
        let url = `${API_Base}/patients/${patientId}/biomarkers`;
        if (category) url += `?category=${category}`;
        const res = await fetch(url);
        return res.json();
    },
    analyzePatient: async (patientId: string): Promise<AnalysisResult> => { // Modified to use Backend Proxy
        const res = await fetch(`${API_Base}/patients/${patientId}/analyze`, { method: 'POST' });
        return res.json();
    }
};
