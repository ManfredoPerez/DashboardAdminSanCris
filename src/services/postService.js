// import { supabase } from "../lib/supabase";
import { supabase } from "../lib/supabase";

export const fetchPosts = async () => {
    try {
        const { data, error } = await supabase
            .from('post')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.log('fetchPosts error: ', error)
            return { success: false, msg: 'Could not fetch the posts' }
        }

        return { success: true, data: data }
    } catch (error) {
        console.log('fetchPosts error: ', error)
        return { success: false, msg: 'Could not fetch the posts' }
    }
}

export const fetchPostsGrafico = async () => {
    try {
        const { data, error } = await supabase
            .from('post')
            .select('*');

        if (error) {
            console.log('fetchPosts error: ', error)
            return { success: false, msg: 'Could not fetch the posts' }
        }

        return { success: true, data: data }
    } catch (error) {
        console.log('fetchPosts error: ', error)
        return { success: false, msg: 'Could not fetch the posts' }
    }
}

export const createOrUpdatePost = async (post) => {
    try {
        const { data, error } = await supabase
            .from('post')
            .upsert(post)
            .select()
            .single();

        if (error) {
            console.log('CreatePost error: ', error);
            return { success: false, msg: 'Could not create your post' };
        }

        return { success: true, data: data }
    } catch (error) {
        console.log('CreatePost error: ', error)
        return { success: false, msg: 'Could not create your post' }
    }
}