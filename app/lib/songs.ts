export interface Song {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string[];
  language: string;
  youtubeId: string;
  thumbnail: string;
}

export const songDatabase: Song[] = [
  // ===== BOLLYWOOD - Happy =====
  { id: "1", title: "Badtameez Dil", artist: "Benny Dayal", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "II2EO3Nw4Q0", thumbnail: "" },
  { id: "2", title: "Gallan Goodiyaan", artist: "Shankar Mahadevan", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "jCEdTq3j-0U", thumbnail: "" },
  { id: "3", title: "London Thumakda", artist: "Labh Janjua & Sonu Kakkar", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "udra3Mfw2oo", thumbnail: "" },
  { id: "4", title: "Kar Gayi Chull", artist: "Badshah & Neha Kakkar", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "NTHz9ephYTw", thumbnail: "" },
  { id: "5", title: "Balam Pichkari", artist: "Vishal Dadlani & Shalmali", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "0WtRNGubWGA", thumbnail: "" },
  { id: "41", title: "Nachde Ne Saare", artist: "Jasleen Royal", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "vyIQpOx_vJY", thumbnail: "" },
  { id: "42", title: "Dil Dhadakne Do", artist: "Priyanka Chopra & Farhan Akhtar", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "lv_FVPuJOEY", thumbnail: "" },
  { id: "43", title: "Ainvayi Ainvayi", artist: "Salim Merchant", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "kYBSqFsOlSY", thumbnail: "" },
  { id: "44", title: "Kala Chashma", artist: "Amar Arshi & Badshah", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "k4yXQPMsmYQ", thumbnail: "" },
  { id: "45", title: "Abhi Toh Party Shuru Hui Hai", artist: "Badshah & Aastha Gill", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "8kkMSfGLWnQ", thumbnail: "" },

  // ===== BOLLYWOOD - Sad =====
  { id: "6", title: "Channa Mereya", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "melancholy"], language: "Hindi", youtubeId: "284Ov7ysmfA", thumbnail: "" },
  { id: "7", title: "Tujhe Kitna Chahne Lage", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "melancholy"], language: "Hindi", youtubeId: "AgX2II9si7w", thumbnail: "" },
  { id: "8", title: "Agar Tum Saath Ho", artist: "Arijit Singh & Alka Yagnik", genre: "Bollywood", mood: ["sad", "melancholy"], language: "Hindi", youtubeId: "sK7riqg2mr4", thumbnail: "" },
  { id: "9", title: "Phir Le Aya Dil", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "melancholy"], language: "Hindi", youtubeId: "xm09SweOEkU", thumbnail: "" },
  { id: "10", title: "Tum Hi Ho", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "Umqb9KENgmk", thumbnail: "" },
  { id: "46", title: "Paaro", artist: "Anuv Jain", genre: "Indie", mood: ["sad", "melancholy", "romantic"], language: "Hindi", youtubeId: "sMRcIOjdojU", thumbnail: "" },
  { id: "47", title: "Saheba", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "romantic", "melancholy"], language: "Hindi", youtubeId: "LnAhF_0svV0", thumbnail: "" },
  { id: "48", title: "Kesariya", artist: "Arijit Singh", genre: "Bollywood", mood: ["romantic", "happy"], language: "Hindi", youtubeId: "BddP6PYo2gs", thumbnail: "" },
  { id: "49", title: "Raabta", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "XCwJaflB5c0", thumbnail: "" },
  { id: "50", title: "Kabira", artist: "Tochi Raina & Rekha Bhardwaj", genre: "Bollywood", mood: ["sad", "calm"], language: "Hindi", youtubeId: "jHNNMj5bNQw", thumbnail: "" },
  { id: "51", title: "Ae Dil Hai Mushkil", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "melancholy"], language: "Hindi", youtubeId: "6FURuLEhFnA", thumbnail: "" },
  { id: "52", title: "Hamari Adhuri Kahani", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "melancholy"], language: "Hindi", youtubeId: "X6GPAkt85Gs", thumbnail: "" },
  { id: "53", title: "Phir Bhi Tumko Chaahunga", artist: "Arijit Singh", genre: "Bollywood", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "Pa_p68OjJQo", thumbnail: "" },

  // ===== BOLLYWOOD - Calm/Relaxed =====
  { id: "11", title: "Tere Bina", artist: "A.R. Rahman", genre: "Bollywood", mood: ["calm", "relaxed"], language: "Hindi", youtubeId: "3d87EMFsMYc", thumbnail: "" },
  { id: "12", title: "Kun Faya Kun", artist: "A.R. Rahman & Javed Ali", genre: "Bollywood", mood: ["calm", "spiritual"], language: "Hindi", youtubeId: "T94PHkuydcw", thumbnail: "" },
  { id: "13", title: "Ilahi", artist: "Arijit Singh", genre: "Bollywood", mood: ["calm", "happy"], language: "Hindi", youtubeId: "IYUQ3VqMotQ", thumbnail: "" },
  { id: "14", title: "Iktara", artist: "Kavita Seth & Amitabh Bhattacharya", genre: "Bollywood", mood: ["calm", "romantic"], language: "Hindi", youtubeId: "fSS_HFlVth8", thumbnail: "" },
  { id: "54", title: "Tum Se Hi", artist: "Mohit Chauhan", genre: "Bollywood", mood: ["calm", "romantic"], language: "Hindi", youtubeId: "mt9xg0mmt28", thumbnail: "" },
  { id: "55", title: "Khairiyat", artist: "Arijit Singh", genre: "Bollywood", mood: ["calm", "sad"], language: "Hindi", youtubeId: "hoNb6HuNmU0", thumbnail: "" },
  { id: "56", title: "Tera Ban Jaunga", artist: "Akhil Sachdeva & Tulsi Kumar", genre: "Bollywood", mood: ["calm", "romantic"], language: "Hindi", youtubeId: "FJYePnRdkP0", thumbnail: "" },

  // ===== BOLLYWOOD - Angry/Intense =====
  { id: "15", title: "Ziddi Dil", artist: "Vishal Dadlani", genre: "Bollywood", mood: ["angry", "motivated"], language: "Hindi", youtubeId: "lkHGmqMPSHE", thumbnail: "" },
  { id: "16", title: "Brothers Anthem", artist: "Vishal Dadlani", genre: "Bollywood", mood: ["angry", "motivated"], language: "Hindi", youtubeId: "6cYkExQMEbQ", thumbnail: "" },
  { id: "17", title: "Sultan", artist: "Sukhwinder Singh", genre: "Bollywood", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "EvGOlAMPgpI", thumbnail: "" },
  { id: "57", title: "Dangal", artist: "Daler Mehndi", genre: "Bollywood", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "ChcR2gKt5WM", thumbnail: "" },
  { id: "58", title: "Chak De India", artist: "Sukhwinder Singh", genre: "Bollywood", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "De-QLiNJTjQ", thumbnail: "" },

  // ===== BOLLYWOOD - Romantic =====
  { id: "59", title: "Tere Hawaale", artist: "Arijit Singh & Shilpa Rao", genre: "Bollywood", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "hTMRPXyrEVM", thumbnail: "" },
  { id: "60", title: "Pehla Nasha", artist: "Udit Narayan & Sadhana Sargam", genre: "Bollywood", mood: ["romantic", "happy"], language: "Hindi", youtubeId: "wqOFBb0P9ew", thumbnail: "" },
  { id: "61", title: "Kal Ho Naa Ho", artist: "Sonu Nigam", genre: "Bollywood", mood: ["romantic", "sad"], language: "Hindi", youtubeId: "g0eO74UmRBs", thumbnail: "" },
  { id: "62", title: "Tujh Mein Rab Dikhta Hai", artist: "Roop Kumar Rathod", genre: "Bollywood", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "e1E8oAeOmRU", thumbnail: "" },
  { id: "63", title: "Raataan Lambiyan", artist: "Jubin Nautiyal & Asees Kaur", genre: "Bollywood", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "gvyU3-jjGOE", thumbnail: "" },
  { id: "64", title: "Hawayein", artist: "Arijit Singh", genre: "Bollywood", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "cYOB941gyXI", thumbnail: "" },

  // ===== PUNJABI =====
  { id: "18", title: "Excuses", artist: "AP Dhillon", genre: "Punjabi", mood: ["happy", "excited"], language: "Punjabi", youtubeId: "9s1qJCrAPw4", thumbnail: "" },
  { id: "19", title: "Brown Munde", artist: "AP Dhillon", genre: "Punjabi", mood: ["motivated", "excited"], language: "Punjabi", youtubeId: "VNs_cCtdbPc", thumbnail: "" },
  { id: "20", title: "Lover", artist: "Diljit Dosanjh", genre: "Punjabi", mood: ["happy", "romantic"], language: "Punjabi", youtubeId: "CzQwbesXxWo", thumbnail: "" },
  { id: "65", title: "Insane", artist: "AP Dhillon", genre: "Punjabi", mood: ["happy", "excited"], language: "Punjabi", youtubeId: "RbJQGSNm-Ug", thumbnail: "" },
  { id: "66", title: "Naina", artist: "Diljit Dosanjh", genre: "Punjabi", mood: ["romantic", "calm"], language: "Punjabi", youtubeId: "vCOSUmHC-xM", thumbnail: "" },
  { id: "67", title: "Laung Laachi", artist: "Mannat Noor", genre: "Punjabi", mood: ["romantic", "happy"], language: "Punjabi", youtubeId: "wEBMliqaBgo", thumbnail: "" },
  { id: "68", title: "Softly", artist: "Karan Aujla", genre: "Punjabi", mood: ["calm", "romantic"], language: "Punjabi", youtubeId: "DL_E4y0bExQ", thumbnail: "" },
  { id: "69", title: "52 Bars", artist: "Karan Aujla", genre: "Punjabi", mood: ["motivated", "excited"], language: "Punjabi", youtubeId: "X3MhEQziG8A", thumbnail: "" },

  // ===== INDIE HINDI =====
  { id: "21", title: "Kahaan Ho Tum", artist: "Prateek Kuhad", genre: "Indie", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "nGnMhSMZuGQ", thumbnail: "" },
  { id: "22", title: "cold/mess", artist: "Prateek Kuhad", genre: "Indie", mood: ["calm", "melancholy"], language: "English", youtubeId: "s2SRMn5a1ks", thumbnail: "" },
  { id: "23", title: "Aaoge Tum Kabhi", artist: "The Local Train", genre: "Indie", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "WGYGhNkPGOg", thumbnail: "" },
  { id: "70", title: "Husn", artist: "Anuv Jain", genre: "Indie", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "AqBvBC1BXWQ", thumbnail: "" },
  { id: "71", title: "Baarishein", artist: "Anuv Jain", genre: "Indie", mood: ["romantic", "calm", "melancholy"], language: "Hindi", youtubeId: "JvWbSBjCJkQ", thumbnail: "" },
  { id: "72", title: "Gul", artist: "Anuv Jain", genre: "Indie", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "Oa0AvLuJxhQ", thumbnail: "" },
  { id: "73", title: "Alag Aasmaan", artist: "Anuv Jain", genre: "Indie", mood: ["calm", "romantic"], language: "Hindi", youtubeId: "vA86QFrXoho", thumbnail: "" },
  { id: "74", title: "Kasoor", artist: "Prateek Kuhad", genre: "Indie", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "EYjkOlH3nm0", thumbnail: "" },
  { id: "75", title: "Khoj", artist: "The Local Train", genre: "Indie", mood: ["motivated", "calm"], language: "Hindi", youtubeId: "VqekOFyNMns", thumbnail: "" },

  // ===== INTERNATIONAL - Happy/Energy =====
  { id: "24", title: "Blinding Lights", artist: "The Weeknd", genre: "Pop", mood: ["happy", "excited"], language: "English", youtubeId: "4NRXx6U8ABQ", thumbnail: "" },
  { id: "25", title: "Levitating", artist: "Dua Lipa", genre: "Pop", mood: ["happy", "excited"], language: "English", youtubeId: "TUVcZfQe-Kw", thumbnail: "" },
  { id: "26", title: "Uptown Funk", artist: "Bruno Mars", genre: "Pop", mood: ["happy", "excited"], language: "English", youtubeId: "OPf0YbXqDm0", thumbnail: "" },
  { id: "76", title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", mood: ["happy", "excited"], language: "English", youtubeId: "JGwWNGJdvx8", thumbnail: "" },
  { id: "77", title: "Dance Monkey", artist: "Tones and I", genre: "Pop", mood: ["happy", "excited"], language: "English", youtubeId: "q0hyYWKXF0Q", thumbnail: "" },
  { id: "78", title: "Happy", artist: "Pharrell Williams", genre: "Pop", mood: ["happy", "excited"], language: "English", youtubeId: "ZbZSe6N_BXs", thumbnail: "" },

  // ===== INTERNATIONAL - Sad =====
  { id: "27", title: "Someone Like You", artist: "Adele", genre: "Pop", mood: ["sad", "melancholy"], language: "English", youtubeId: "hLQl3WQQoQ0", thumbnail: "" },
  { id: "28", title: "Fix You", artist: "Coldplay", genre: "Rock", mood: ["sad", "calm"], language: "English", youtubeId: "k4V3Mo61fJM", thumbnail: "" },
  { id: "29", title: "Let Her Go", artist: "Passenger", genre: "Indie", mood: ["sad", "melancholy"], language: "English", youtubeId: "RBumgq5yVrA", thumbnail: "" },
  { id: "79", title: "When I Was Your Man", artist: "Bruno Mars", genre: "Pop", mood: ["sad", "melancholy"], language: "English", youtubeId: "ekzHIouo8Q4", thumbnail: "" },
  { id: "80", title: "Someone You Loved", artist: "Lewis Capaldi", genre: "Pop", mood: ["sad", "melancholy"], language: "English", youtubeId: "zABLecsR5UE", thumbnail: "" },

  // ===== INTERNATIONAL - Calm =====
  { id: "30", title: "Weightless", artist: "Marconi Union", genre: "Ambient", mood: ["calm", "relaxed"], language: "Instrumental", youtubeId: "UfcAVejslrU", thumbnail: "" },
  { id: "31", title: "Clair de Lune", artist: "Debussy", genre: "Classical", mood: ["calm", "relaxed"], language: "Instrumental", youtubeId: "CvFH_6DNRCY", thumbnail: "" },
  { id: "81", title: "River Flows in You", artist: "Yiruma", genre: "Classical", mood: ["calm", "romantic"], language: "Instrumental", youtubeId: "7maJOI3QMu0", thumbnail: "" },
  { id: "82", title: "A Thousand Years", artist: "Christina Perri", genre: "Pop", mood: ["romantic", "calm"], language: "English", youtubeId: "rtOvBOTyX00", thumbnail: "" },

  // ===== EDM / Workout =====
  { id: "32", title: "Faded", artist: "Alan Walker", genre: "EDM", mood: ["calm", "melancholy"], language: "English", youtubeId: "60ItHLz5WEA", thumbnail: "" },
  { id: "33", title: "Alone", artist: "Alan Walker", genre: "EDM", mood: ["motivated", "excited"], language: "English", youtubeId: "1-xGerv5FOk", thumbnail: "" },
  { id: "34", title: "Titanium", artist: "David Guetta ft. Sia", genre: "EDM", mood: ["motivated", "excited"], language: "English", youtubeId: "JRfuAukYTKg", thumbnail: "" },
  { id: "83", title: "On My Way", artist: "Alan Walker", genre: "EDM", mood: ["motivated", "excited"], language: "English", youtubeId: "dhYOPzcsbGM", thumbnail: "" },
  { id: "84", title: "Darkside", artist: "Alan Walker", genre: "EDM", mood: ["calm", "melancholy"], language: "English", youtubeId: "M-P4QBt-FWw", thumbnail: "" },

  // ===== TAMIL =====
  { id: "35", title: "Why This Kolaveri Di", artist: "Dhanush", genre: "Tamil", mood: ["happy", "excited"], language: "Tamil", youtubeId: "YR12Z8f1Dh8", thumbnail: "" },
  { id: "36", title: "Roja Kadhal Rojave", artist: "S.P. Balasubrahmanyam", genre: "Tamil", mood: ["romantic", "calm"], language: "Tamil", youtubeId: "M5m0JMfaEBQ", thumbnail: "" },
  { id: "85", title: "Oo Antava", artist: "Indravathi Chauhan", genre: "Tamil", mood: ["happy", "excited"], language: "Telugu", youtubeId: "xXNbcG4WRKA", thumbnail: "" },
  { id: "86", title: "Arabic Kuthu", artist: "Anirudh Ravichander", genre: "Tamil", mood: ["happy", "excited"], language: "Tamil", youtubeId: "oGBQbH4Ixag", thumbnail: "" },

  // ===== HIP HOP =====
  { id: "37", title: "Apna Time Aayega", artist: "Ranveer Singh", genre: "Hip Hop", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "jA4nP1MFTuQ", thumbnail: "" },
  { id: "38", title: "Asli Hip Hop", artist: "Ranveer Singh", genre: "Hip Hop", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "BddP6PYo2gs", thumbnail: "" },
  { id: "87", title: "Mere Gully Mein", artist: "DIVINE & Naezy", genre: "Hip Hop", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "1bK5dzwhu-I", thumbnail: "" },
  { id: "88", title: "Yeh Babey", artist: "Seedhe Maut", genre: "Hip Hop", mood: ["motivated", "angry"], language: "Hindi", youtubeId: "zzm7JhGhIaQ", thumbnail: "" },
  { id: "89", title: "Kohinoor", artist: "DIVINE", genre: "Hip Hop", mood: ["motivated", "excited"], language: "Hindi", youtubeId: "FLGCGc7sAUw", thumbnail: "" },

  // ===== LOFI =====
  { id: "39", title: "Agar Tum Saath Ho (Lofi)", artist: "Arijit Singh (Lofi Remix)", genre: "Lofi", mood: ["calm", "sad"], language: "Hindi", youtubeId: "eFDhYGEhRiA", thumbnail: "" },
  { id: "40", title: "Tum Se Hi (Lofi)", artist: "Mohit Chauhan (Lofi Remix)", genre: "Lofi", mood: ["calm", "romantic"], language: "Hindi", youtubeId: "mt9xg0mmt28", thumbnail: "" },
  { id: "90", title: "Channa Mereya (Lofi)", artist: "Arijit Singh (Lofi Remix)", genre: "Lofi", mood: ["calm", "sad", "melancholy"], language: "Hindi", youtubeId: "HmJbJBnFCrQ", thumbnail: "" },
  { id: "91", title: "Tum Hi Ho (Lofi)", artist: "Arijit Singh (Lofi Remix)", genre: "Lofi", mood: ["calm", "romantic", "sad"], language: "Hindi", youtubeId: "3WzKJmMCl0Y", thumbnail: "" },
  { id: "92", title: "Kabira (Lofi)", artist: "Tochi Raina (Lofi Remix)", genre: "Lofi", mood: ["calm", "melancholy"], language: "Hindi", youtubeId: "YLwODMsXSuE", thumbnail: "" },

  // ===== RETRO BOLLYWOOD =====
  { id: "93", title: "Tere Bina Zindagi Se", artist: "Lata Mangeshkar & Kishore Kumar", genre: "Bollywood", mood: ["sad", "romantic"], language: "Hindi", youtubeId: "1xLCIQz4pfs", thumbnail: "" },
  { id: "94", title: "Lag Ja Gale", artist: "Lata Mangeshkar", genre: "Bollywood", mood: ["romantic", "calm"], language: "Hindi", youtubeId: "TFr6G5sxAlA", thumbnail: "" },
  { id: "95", title: "Ek Ladki Ko Dekha", artist: "Kumar Sanu", genre: "Bollywood", mood: ["romantic", "happy"], language: "Hindi", youtubeId: "h3JFEfdcLMw", thumbnail: "" },
  { id: "96", title: "Chaiyya Chaiyya", artist: "Sukhwinder Singh", genre: "Bollywood", mood: ["happy", "excited"], language: "Hindi", youtubeId: "YOYN9qNXmAw", thumbnail: "" },
  { id: "97", title: "Dil Se Re", artist: "A.R. Rahman", genre: "Bollywood", mood: ["motivated", "romantic"], language: "Hindi", youtubeId: "xm09SweOEkU", thumbnail: "" },

  // ===== INTERNATIONAL - Romantic =====
  { id: "98", title: "Perfect", artist: "Ed Sheeran", genre: "Pop", mood: ["romantic", "calm"], language: "English", youtubeId: "2Vv-BfVoq4g", thumbnail: "" },
  { id: "99", title: "All of Me", artist: "John Legend", genre: "Pop", mood: ["romantic", "calm"], language: "English", youtubeId: "450p7goxZqg", thumbnail: "" },
  { id: "100", title: "Love Me Like You Do", artist: "Ellie Goulding", genre: "Pop", mood: ["romantic", "happy"], language: "English", youtubeId: "AJtDXIazrMo", thumbnail: "" },
];

export function getSongsByMood(mood: string, count: number = 5): Song[] {
  const moodMap: Record<string, string[]> = {
    happy: ["happy", "excited"],
    sad: ["sad", "melancholy"],
    angry: ["angry", "motivated"],
    calm: ["calm", "relaxed", "spiritual"],
    excited: ["excited", "motivated", "happy"],
    romantic: ["romantic", "calm"],
    stressed: ["calm", "relaxed"],
    neutral: ["calm", "happy"],
    motivated: ["motivated", "excited"],
    melancholy: ["melancholy", "sad", "calm"],
  };

  const targetMoods = moodMap[mood.toLowerCase()] || [mood.toLowerCase()];
  const matched = songDatabase.filter((song) =>
    song.mood.some((m) => targetMoods.includes(m))
  );

  const shuffled = matched.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export function getPersonalityType(moods: string[], genres: string[]): {
  type: string;
  emoji: string;
  description: string;
  traits: string[];
  recommendedGenres: string[];
} {
  const moodCounts: Record<string, number> = {};
  moods.forEach((m) => {
    moodCounts[m] = (moodCounts[m] || 0) + 1;
  });

  const dominantMood = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "neutral";

  const personalities: Record<string, { type: string; emoji: string; description: string; traits: string[]; recommendedGenres: string[] }> = {
    sad: {
      type: "Emotional Listener",
      emoji: "🎧",
      description: "You connect deeply with music that touches the soul. Your playlist is a journey through emotions.",
      traits: ["Deep lyrics lover", "Late night listener", "Prefers acoustic sounds", "Emotional connection with music"],
      recommendedGenres: ["Indie", "Soft Pop", "Acoustic", "Lofi", "Bollywood Ballads"],
    },
    happy: {
      type: "Vibe Creator",
      emoji: "🎉",
      description: "You're the life of the party! Your music choices light up every room.",
      traits: ["Party playlist maker", "Upbeat song lover", "Dance enthusiast", "Spreads joy through music"],
      recommendedGenres: ["Pop", "Bollywood Dance", "Punjabi", "EDM", "Hip Hop"],
    },
    calm: {
      type: "Zen Master",
      emoji: "🧘",
      description: "You find peace in melodies. Music is your meditation and escape.",
      traits: ["Calm song preference", "Ambient lover", "Mindful listener", "Appreciates instrumentals"],
      recommendedGenres: ["Ambient", "Classical", "Lofi", "Sufi", "Acoustic"],
    },
    motivated: {
      type: "Energy Seeker",
      emoji: "⚡",
      description: "You use music as fuel! Every beat pushes you to go harder.",
      traits: ["Workout playlist king", "Fast beats lover", "Motivational anthem fan", "High energy vibes"],
      recommendedGenres: ["EDM", "Hip Hop", "Rock", "Punjabi", "Bollywood Pump"],
    },
    angry: {
      type: "Storm Rider",
      emoji: "🔥",
      description: "You channel your intensity through powerful music. Raw and unfiltered.",
      traits: ["Heavy beats preference", "Intense lyrics", "Power anthem lover", "Cathartic listener"],
      recommendedGenres: ["Rock", "Hip Hop", "Metal", "Rap", "Intense Bollywood"],
    },
    romantic: {
      type: "Love Poet",
      emoji: "💕",
      description: "Romance flows through your veins. Every song tells a love story.",
      traits: ["Romantic ballad lover", "Soulful voice appreciation", "Sunset playlist maker", "Heart-on-sleeve listener"],
      recommendedGenres: ["Bollywood Romance", "R&B", "Soft Pop", "Ghazals", "Indie Love"],
    },
  };

  return personalities[dominantMood] || personalities["happy"];
}