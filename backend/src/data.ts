import { Patient, Biomarker, BiomarkerCategory, BiomarkerStatus } from './types';
// Simple ID generator to avoid deps for now if I don't want to install uuid
const generateId = () => Math.random().toString(36).substr(2, 9);

export const patients: Patient[] = [];
export const biomarkers: Biomarker[] = [];

const CATEGORIES: BiomarkerCategory[] = ['metabolic', 'cardiovascular', 'hormonal'];

const BIOMARKER_TYPES = {
    metabolic: [
        { name: 'Glucose', unit: 'mg/dL', min: 70, max: 99 },
        { name: 'HbA1c', unit: '%', min: 4.0, max: 5.6 },
        { name: 'Cholesterol', unit: 'mg/dL', min: 125, max: 200 },
        { name: 'Triglycerides', unit: 'mg/dL', min: 0, max: 150 },
        { name: 'HDL', unit: 'mg/dL', min: 40, max: 60 },
    ],
    cardiovascular: [
        { name: 'Systolic BP', unit: 'mmHg', min: 90, max: 120 },
        { name: 'Diastolic BP', unit: 'mmHg', min: 60, max: 80 },
        { name: 'Heart Rate', unit: 'bpm', min: 60, max: 100 },
        { name: 'Troponin', unit: 'ng/mL', min: 0, max: 0.04 },
        { name: 'C-Reactive Protein', unit: 'mg/L', min: 0, max: 3.0 },
    ],
    hormonal: [
        { name: 'TSH', unit: 'mIU/L', min: 0.4, max: 4.0 },
        { name: 'Free T4', unit: 'ng/dL', min: 0.8, max: 1.8 },
        { name: 'Cortisol', unit: 'mcg/dL', min: 6, max: 23 },
        { name: 'Testosterone', unit: 'ng/dL', min: 300, max: 1000 },
        { name: 'Estradiol', unit: 'pg/mL', min: 10, max: 40 },
    ]
};

function getRandomDate(start: Date, end: Date) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function determineStatus(value: number, min: number, max: number): BiomarkerStatus {
    if (value < min) return 'low';
    if (value > max) return 'high';
    return 'normal';
}

export function seedData() {
    // Seed 5 patients
    for (let i = 0; i < 5; i++) {
        const patientId = generateId();
        patients.push({
            id: patientId,
            name: `Patient ${i + 1}`,
            dateOfBirth: getRandomDate(new Date(1950, 0, 1), new Date(1990, 0, 1)).toISOString().split('T')[0],
            lastVisit: getRandomDate(new Date(2023, 0, 1), new Date()).toISOString(),
        });

        // Seed 15 biomarkers for each patient (5 per category)
        Object.entries(BIOMARKER_TYPES).forEach(([category, types]) => {
            types.forEach(type => {
                // Generate a value slightly outside range sometimes
                const isAbnormal = Math.random() > 0.7;
                let value: number;
                if (isAbnormal) {
                    value = Math.random() > 0.5
                        ? type.max + (type.max * 0.2 * Math.random()) // High
                        : type.min - (type.min * 0.2 * Math.random()); // Low
                } else {
                    value = type.min + (Math.random() * (type.max - type.min));
                }

                // Round to 1 decimal
                value = Math.round(value * 10) / 10;

                biomarkers.push({
                    id: generateId(),
                    patientId,
                    name: type.name,
                    value,
                    unit: type.unit,
                    category: category as BiomarkerCategory,
                    range: { min: type.min, max: type.max },
                    measuredAt: new Date().toISOString(),
                    status: determineStatus(value, type.min, type.max),
                });
            });
        });
    }
}

// Initialize immediately
seedData();
