<?php
 
 namespace App\Http\Controllers;

 use App\Models\User;
 use Illuminate\Http\Request;
 use App\Http\Resources\UserResource;
 use App\Http\Resources\PodcastResource;
 use Illuminate\Support\Facades\Auth;
 use Illuminate\Support\Facades\Log;
 use App\Models\Podcast;
 
 class UserController extends Controller
 {
     

     public function index(Request $request)
     {
        
        try {
           
            return UserResource::collection(User::all());

        } catch (Exception $e) {
           
            return response()->json([
                'message' => 'Došlo je do greške prilikom učitavanja korisnika.',
                'error' => $e->getMessage()
            ], 500); 
        }
    }


  


    public function mojiPodcasti(Request $request)
    {
        try{
            $perPage = $request->input('per_page', 10); 
            $user = Auth::user();
            $podkasti = $user->mojiPodkasti()->paginate($perPage);
            return PodcastResource::collection($podkasti);
        }catch (\Exception $e) {
           
            return response()->json([
                'message' => 'Došlo je do greške prilikom dohvatanja podkasta.',
                'error' => $e->getMessage(),
            ], 500);
        }
       
    }


    
    public function getFavorites(Request $request)
    {
        try {
            $user = Auth::user();
            $query = $user->listaOmiljenihPodkasta()->newQuery();
    
            if ($request->filled('id_autora')) {
                $query->whereHas('autori', function ($q) use ($request) {
                     $q->where('users.id', $request->id_autora);
                });
            }
    
            $perPage = $request->input('per_page', 10); 
            $omiljeniPodkasti = $query->paginate($perPage);
    
            return PodcastResource::collection($omiljeniPodkasti);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Došlo je do greške pri dohvatanju omiljenih podkasta.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    

    public function getUsersOfFavoritesPodcasts()
    {
        try {
           
            $user = Auth::user();
    
         
            $omiljeniPodkasti = $user->listaOmiljenihPodkasta;
    
            if ($omiljeniPodkasti->isEmpty()) {
                return response()->json(['message' => 'Nemate nijedan omiljeni podkast.'], 200);
            }
    
           
            $autori = $omiljeniPodkasti
                ->pluck('autori') 
                ->flatten() 
                ->unique('id') 
                ->values(); 
    
            return UserResource::collection($autori);
    
        } catch (\Exception $e) {
            return response()->json(['message' => 'Došlo je do greške pri dohvatanju autora iz omiljenih podkasta.'], 500);
        }
    }
    



     
 }