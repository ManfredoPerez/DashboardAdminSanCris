import { supabase } from "../lib/supabase"

export const fetchUsers = async () => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')

        if (error) {
            console.log('fetchUsers error: ', error)
            return { success: false, msg: 'Could not fetch the users' }
        }

        return { success: true, data: data }
    } catch (error) {
        console.log('fetchUsers error: ', error)
        return { success: false, msg: 'Could not fetch the users' }
    }
}

export const getUserData = async (userId) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id, created_at, name, image, bio, email, address, phoneNumber')
            .eq('id', userId)
            .single();

        if (error) {
            return { success: false, msg: error?.message };
        }
        return { success: true, data };
    } catch (error) {
        console.log('got error', error)
        return { success: false, msg: error.message };
    }
}

export const updateUser = async (userId, data) => {
    try {
        const { error } = await supabase
            .from('users')
            .update(data)
            .eq('id', userId)

        if (error) {
            return { success: false, msg: error?.message }
        }
        return { success: true, data }
    } catch (error) {
        console.log('got error: ', error);
        return { success: false, msg: error.message }
    }
}