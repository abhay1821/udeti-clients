// API services and external integrations

import { Clinic } from '@/types/Clinic';

/**
 * Mock API service for clinics
 */
export class ClinicService {
  private static clinics: Clinic[] = [];

  static async getAllClinics(): Promise<Clinic[]> {
    // In a real app, this would be an API call
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.clinics);
      }, 100);
    });
  }

  static async getClinicById(id: string): Promise<Clinic | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const clinic = this.clinics.find(c => c.id === id);
        resolve(clinic || null);
      }, 100);
    });
  }

  static async createClinic(clinic: Clinic): Promise<Clinic> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.clinics.push(clinic);
        resolve(clinic);
      }, 100);
    });
  }

  static async updateClinic(
    id: string,
    updates: Partial<Clinic>
  ): Promise<Clinic | null> {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = this.clinics.findIndex(c => c.id === id);
        if (index !== -1) {
          this.clinics[index] = { ...this.clinics[index], ...updates };
          resolve(this.clinics[index]);
        }
        resolve(null);
      }, 100);
    });
  }

  static async deleteClinic(id: string): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        const index = this.clinics.findIndex(c => c.id === id);
        if (index !== -1) {
          this.clinics.splice(index, 1);
          resolve(true);
        }
        resolve(false);
      }, 100);
    });
  }
}

/**
 * Analytics service
 */
export class AnalyticsService {
  static trackEvent(eventName: string, properties?: Record<string, unknown>) {
    // In a real app, this would integrate with Google Analytics, Mixpanel, etc.
    console.log('Analytics Event:', eventName, properties);
  }

  static trackPageView(pageName: string) {
    this.trackEvent('page_view', { page: pageName });
  }

  static trackButtonClick(buttonName: string, location?: string) {
    this.trackEvent('button_click', { button: buttonName, location });
  }
}

/**
 * Storage service for client-side data
 */
export class StorageService {
  static setItem(key: string, value: unknown): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  static getItem<T>(key: string, defaultValue?: T): T | null {
    if (typeof window === 'undefined') {
      return defaultValue || null;
    }
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue || null;
    } catch {
      return defaultValue || null;
    }
  }

  static removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  static clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
}
