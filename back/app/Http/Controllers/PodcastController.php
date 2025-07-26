<?php

namespace App\Http\Controllers;

use App\Models\Podcast;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Resources\PodcastResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;


class PodcastController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $idAutora = $request->input('id_autora'); 
    
        try {
            if ($idAutora) {
               
                $user = User::find($idAutora);
    
                if (!$user) {
                    return response()->json([
                        'message' => 'Autor nije pronađen.',
                    ], 404);
                }
    
             
                $podkasti = $user->mojiPodkasti()->paginate($perPage);
            } else {
               
                $podkasti = Podcast::orderBy('naslov', 'asc')->paginate($perPage);
            }
    
          
            return PodcastResource::collection($podkasti);
    
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Došlo je do greške prilikom dohvatanja podkasta.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


   
    

    public function destroy($id)
    {
        try {
           
    
            $podcast = Podcast::findOrFail($id);
            $user = Auth::user();
    
            if ($podcast->logo_putanja) {
                $putanjaBanera = public_path($podcast->logo_putanja);
                $direktorijum = dirname($putanjaBanera);
                if (File::exists($direktorijum)) {
                    File::deleteDirectory($direktorijum);
                }
            }
    
          
            $podcast->delete();
    
            return response()->json(['message' => 'Podcast i svi povezani resursi su uspešno obrisani.'], 200);
        } catch (\Exception $e) {
            Log::error('Greška prilikom brisanja podcasta: ' . $e->getMessage());
            return response()->json(['message' => 'Došlo je do greške prilikom brisanja podcasta.', 'error' => $e->getMessage()], 500);
        }
    }


  
}

    






