import { supabase } from '../config/supabase';

// User related operations
export const createUser = async (userId, userData) => {
  const { data, error } = await supabase
    .from('users')
    .insert([{ id: userId, ...userData }]);
  
  if (error) throw error;
  return data;
};

export const updateUser = async (userId, updates) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .match({ id: userId });
  
  if (error) throw error;
  return data;
};

export const getUserData = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};

// Game scores and progress
export const saveGameScore = async (userId, gameId, score) => {
  const { data, error } = await supabase
    .from('game_scores')
    .insert([{
      user_id: userId,
      game_id: gameId,
      score: score,
      created_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const getHighScores = async (gameId, limit = 10) => {
  const { data, error } = await supabase
    .from('game_scores')
    .select(`
      score,
      created_at,
      users (
        username,
        avatar_url
      )
    `)
    .eq('game_id', gameId)
    .order('score', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data;
};

// User inventory and skins
export const getUserInventory = async (userId) => {
  const { data, error } = await supabase
    .from('user_inventory')
    .select(`
      id,
      item_id,
      equipped,
      purchased_at,
      items (
        name,
        type,
        rarity,
        image_url
      )
    `)
    .eq('user_id', userId);
  
  if (error) throw error;
  return data;
};

export const purchaseItem = async (userId, itemId, price) => {
  const { data, error } = await supabase
    .from('user_inventory')
    .insert([{
      user_id: userId,
      item_id: itemId,
      purchased_at: new Date().toISOString(),
      price: price
    }]);
  
  if (error) throw error;
  return data;
};

export const equipItem = async (userId, itemId, gameId) => {
  // First, unequip all items of the same type for this game
  const { error: unequipError } = await supabase
    .from('user_inventory')
    .update({ equipped: false })
    .match({ user_id: userId, game_id: gameId });
  
  if (unequipError) throw unequipError;
  
  // Then equip the selected item
  const { data, error } = await supabase
    .from('user_inventory')
    .update({ equipped: true })
    .match({ user_id: userId, item_id: itemId });
  
  if (error) throw error;
  return data;
};

// User progress and achievements
export const updateProgress = async (userId, gameId, progressData) => {
  const { data, error } = await supabase
    .from('user_progress')
    .upsert([{
      user_id: userId,
      game_id: gameId,
      ...progressData,
      updated_at: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};

export const getProgress = async (userId, gameId) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .match({ user_id: userId, game_id: gameId })
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // Ignore "not found" errors
  return data;
}; 