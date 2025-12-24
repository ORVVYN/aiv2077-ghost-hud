/**
 * Telegram WebApp SDK Integration
 * Provides haptic feedback and cloud storage utilities
 */

class TelegramService {
  constructor() {
    this.webApp = window.Telegram?.WebApp;
    this.isAvailable = !!this.webApp;

    if (this.isAvailable) {
      this.webApp.ready();
      this.webApp.expand();
      this.webApp.enableClosingConfirmation();

      // Set theme to match our cyber aesthetic
      this.webApp.setHeaderColor('#050505');
      this.webApp.setBackgroundColor('#050505');
    }
  }

  // Haptic Feedback Methods
  impactOccurred(style = 'medium') {
    if (this.isAvailable && this.webApp.HapticFeedback) {
      this.webApp.HapticFeedback.impactOccurred(style); // 'light', 'medium', 'heavy', 'rigid', 'soft'
    }
  }

  notificationOccurred(type = 'success') {
    if (this.isAvailable && this.webApp.HapticFeedback) {
      this.webApp.HapticFeedback.notificationOccurred(type); // 'error', 'success', 'warning'
    }
  }

  selectionChanged() {
    if (this.isAvailable && this.webApp.HapticFeedback) {
      this.webApp.HapticFeedback.selectionChanged();
    }
  }

  // Tactical Haptic Patterns
  neuralSync() {
    // Heavy thrum for neural link
    this.impactOccurred('heavy');
    setTimeout(() => this.impactOccurred('medium'), 100);
    setTimeout(() => this.impactOccurred('light'), 200);
  }

  gridKeyPress() {
    // Quick chirp for numpad
    this.impactOccurred('light');
  }

  criticalHit() {
    // Intense vibration for critical damage
    this.impactOccurred('heavy');
    setTimeout(() => this.impactOccurred('heavy'), 50);
  }

  systemBoot() {
    // Boot sequence haptic
    this.impactOccurred('rigid');
    setTimeout(() => this.impactOccurred('medium'), 300);
    setTimeout(() => this.impactOccurred('soft'), 600);
  }

  // Cloud Storage Methods
  async saveData(key, value) {
    if (this.isAvailable && this.webApp.CloudStorage) {
      return new Promise((resolve) => {
        this.webApp.CloudStorage.setItem(key, JSON.stringify(value), (error, success) => {
          if (error) {
            console.error('CloudStorage save error:', error);
            resolve(false);
          } else {
            resolve(success);
          }
        });
      });
    }
    // Fallback to localStorage
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  async loadData(key) {
    if (this.isAvailable && this.webApp.CloudStorage) {
      return new Promise((resolve) => {
        this.webApp.CloudStorage.getItem(key, (error, value) => {
          if (error) {
            console.error('CloudStorage load error:', error);
            resolve(null);
          } else {
            resolve(value ? JSON.parse(value) : null);
          }
        });
      });
    }
    // Fallback to localStorage
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  // User Info
  getUserData() {
    if (this.isAvailable) {
      return {
        id: this.webApp.initDataUnsafe?.user?.id,
        firstName: this.webApp.initDataUnsafe?.user?.first_name,
        lastName: this.webApp.initDataUnsafe?.user?.last_name,
        username: this.webApp.initDataUnsafe?.user?.username,
        languageCode: this.webApp.initDataUnsafe?.user?.language_code,
      };
    }
    return null;
  }

  // Close the app
  close() {
    if (this.isAvailable) {
      this.webApp.close();
    }
  }
}

// Singleton instance
const telegram = new TelegramService();

export default telegram;
