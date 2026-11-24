import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';

/**
 * Konfigurasi Firebase dari Variabel Lingkungan (.env.local)
 * Di Vite, variabel harus diawali dengan VITE_
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inisialisasi Firebase App
export const app = initializeApp(firebaseConfig);

// Inisialisasi Firebase Authentication
export const auth = getAuth(app);

// Provider Autentikasi Google
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

/**
 * Menerjemahkan kode error Firebase Auth ke dalam Bahasa Indonesia yang ramah pemula
 */
export function translateFirebaseAuthError(errorCode) {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email atau kata sandi yang Anda masukkan salah. Silakan periksa kembali.';
    case 'auth/email-already-in-use':
      return 'Alamat email ini sudah terdaftar. Silakan langsung masuk ke akun Anda.';
    case 'auth/invalid-email':
      return 'Format alamat email tidak valid.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu lemah. Gunakan minimal 6 karakter.';
    case 'auth/popup-closed-by-user':
      return 'Jendela masuk Google ditutup sebelum proses selesai. Silakan coba lagi.';
    case 'auth/cancelled-popup-request':
      return 'Proses masuk Google dibatalkan karena ada permintaan baru.';
    case 'auth/popup-blocked':
      return 'Jendela popup Google diblokir oleh peramban. Izinkan popup untuk situs ini.';
    case 'auth/network-request-failed':
      return 'Gagal terhubung ke jaringan. Periksa koneksi internet Anda.';
    case 'auth/operation-not-allowed':
      return 'Metode login ini belum diaktifkan di Firebase Console. Pastikan Google / Email telah di-enable pada menu Authentication -> Sign-in method.';
    case 'auth/too-many-requests':
      return 'Terlalu banyak percobaan gagal. Silakan tunggu beberapa saat sebelum mencoba lagi.';
    default:
      return 'Terjadi kendala saat autentikasi. Pastikan koneksi internet stabil.';
  }
}

/**
 * Memformat objek user dari Firebase menjadi bentuk data profil ReactionLab
 */
export function formatUserProfile(firebaseUser, customClass = '') {
  if (!firebaseUser) return null;

  // Baca kelas tersimpan dari LocalStorage jika ada
  const savedClassKey = `reactionlab_user_class_${firebaseUser.uid}`;
  const resolvedClass =
    customClass ||
    localStorage.getItem(savedClassKey) ||
    'XI Fase F (Siswa SMA)';

  // Jika ada customClass yang baru dimasukkan, simpan ke local cache
  if (customClass) {
    localStorage.setItem(savedClassKey, customClass);
  }

  const isGoogle = firebaseUser.providerData?.some(
    (p) => p.providerId === 'google.com'
  );

  const displayName =
    firebaseUser.displayName ||
    (firebaseUser.email ? firebaseUser.email.split('@')[0] : 'Siswa Kimia');

  return {
    uid: firebaseUser.uid,
    id: firebaseUser.uid,
    name: displayName,
    email: firebaseUser.email || '',
    className: resolvedClass,
    provider: isGoogle ? 'google' : 'email',
    photoURL: firebaseUser.photoURL || null,
    avatarInitial: displayName.charAt(0).toUpperCase(),
    loggedInAt: new Date().toISOString()
  };
}

/**
 * 1. Masuk Menggunakan Akun Google Sungguhan (Google Popup Sign-In)
 */
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return {
      success: true,
      user: formatUserProfile(result.user)
    };
  } catch (error) {
    console.error('Firebase Google Sign-In Error:', error);
    return {
      success: false,
      error: translateFirebaseAuthError(error.code),
      code: error.code
    };
  }
}

/**
 * 2. Masuk Menggunakan Email & Kata Sandi Sungguhan
 */
export async function signInWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email.trim(), password);
    return {
      success: true,
      user: formatUserProfile(result.user)
    };
  } catch (error) {
    console.error('Firebase Email Sign-In Error:', error);
    return {
      success: false,
      error: translateFirebaseAuthError(error.code),
      code: error.code
    };
  }
}

/**
 * 3. Mendaftarkan Akun Siswa Baru Sungguhan (Email, Kata Sandi, Nama Lengkap, & Kelas)
 */
export async function registerWithEmail(email, password, name, className) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email.trim(), password);

    // Perbarui Display Name di akun Firebase Auth
    if (name) {
      await updateProfile(result.user, {
        displayName: name.trim()
      });
    }

    // Format profil siswa dan simpan relasi kelas
    const profile = formatUserProfile(result.user, className);

    return {
      success: true,
      user: profile
    };
  } catch (error) {
    console.error('Firebase Register Error:', error);
    return {
      success: false,
      error: translateFirebaseAuthError(error.code),
      code: error.code
    };
  }
}

/**
 * 4. Mengirimkan Tautan Atur Ulang Kata Sandi (Password Reset Email) Sungguhan
 */
export async function resetUserPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email.trim());
    return {
      success: true,
      message: `Tautan pengaturan ulang kata sandi resmi telah dikirim ke ${email}. Periksa kotak masuk atau folder spam Anda.`
    };
  } catch (error) {
    console.error('Firebase Password Reset Error:', error);
    return {
      success: false,
      error: translateFirebaseAuthError(error.code),
      code: error.code
    };
  }
}

/**
 * 5. Keluar dari Akun (Sign Out)
 */
export async function logOut() {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Firebase Sign Out Error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * 6. Listener Perubahan Status Autentikasi Pengguna
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      callback(formatUserProfile(firebaseUser));
    } else {
      callback(null);
    }
  });
}

