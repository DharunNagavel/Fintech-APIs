// Simulate API calls with delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Initialize users in localStorage if not exists
const initializeUsers = () => {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify([]));
  }
};

initializeUsers();

export const authService = {
  async signup(userData) {
    await delay(1000); // Simulate network delay
    
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      
      // Check if user already exists
      const existingUser = users.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (store only file name, not actual file)
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        panCardPhoto: userData.panCardPhoto ? userData.panCardPhoto.name : null,
        createdAt: new Date().toISOString()
      };
      
      // Remove sensitive data from stored user
      delete newUser.password;
      delete newUser.confirmPassword;
      
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Generate mock JWT token
      const token = `mock-jwt-token-${Date.now()}`;
      
      return {
        success: true,
        user: newUser,
        token
      };
    } catch (error) {
      throw error;
    }
  },

  async login(email, password) {
    await delay(1000);
    
    try {
      const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
      const user = users.find(u => u.email === email);
      
      // In a real app, you'd verify password hash
      // Here we're just simulating a successful login for demo
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      const token = `mock-jwt-token-${Date.now()}`;
      
      return {
        success: true,
        user,
        token
      };
    } catch (error) {
      throw error;
    }
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser() {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);
    return currentUser ? JSON.parse(currentUser) : null;
  },

  setCurrentUser(user, token) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ user, token }));
  },

  verifyOTP(otp) {
    return delay(500).then(() => {
      // For demo, accept 123456 or random validation
      return otp === '123456';
    });
  }
};