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

 public function show($id)
    {
        try{
            $podkast = Podcast::findOrFail($id);
            Log::info($podkast);
            return new PodcastResource($podkast);
        }
        catch (\Exception $e) {
          
            return response()->json([
                'message' => 'Došlo je do greške prilikom dohvatanja podkasta.',
                'error' => $e->getMessage(),
            ], 500);
        }
        
      
    }


    
    public function store(Request $request)
{
    try {
      
   
        $request->validate([
            'naslov' => 'required|string',
            'kratak_sadrzaj' => 'required|string',
            'kategorija_id' => 'required|exists:kategorije,id',
            'logo_putanja' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048', 
            'kreatori' => 'required|array',
            'kreatori.*.id' => 'exists:users,id', 
        ]);

        $podcast = Podcast::create([
            'naslov' => $request->naslov,
            'kratak_sadrzaj' => $request->kratak_sadrzaj,
            'kategorija_id' => $request->kategorija_id,
            'logo_putanja' => $this->uploadLogo($request->file('logo_putanja'), $request->naslov),

        ]);

        $kreatori = collect($request->kreatori)->pluck('id');
        $podcast->autori()->sync($kreatori);

       
        return response()->json([
            'message' => 'Podkast je uspešno sačuvan',
            'podkast' => $podcast,
        ], 201);
    } catch (\Exception $e) {
      
        return response()->json([
            'message' => 'Greška prilikom čuvanja podkasta',
            'error' => $e->getMessage()
        ], 500);
    }
}


private function uploadLogo($file, $naslov)
{
  
    $sanitizedNaslov = preg_replace('/[^a-zA-Z0-9_-]/', '_', $naslov);
    $extension = $file->getClientOriginalExtension();
    $filename = $sanitizedNaslov . '.' . $extension;

    
    $path = 'app/' . $sanitizedNaslov;

   
    if (!Storage::exists($path)) {
        Storage::makeDirectory($path);
    }

    $pathFile = $file->storeAs($path, $filename,"public");

    
    return Storage::url($pathFile);
}



public function update(Request $request, $podcastId)
{
  
    try {
        $request->validate([
            'naslov' => 'required|string',
            'kratak_sadrzaj' => 'required|string',
            'kategorija_id' => 'required|exists:kategorije,id',
            'logo_putanja' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',  
        ]);

        $podcast = Podcast::findOrFail($podcastId);

       
        $podcast->naslov = $request->naslov;
        $podcast->kratak_sadrzaj = $request->kratak_sadrzaj;
        $podcast->kategorija_id = $request->kategorija_id;

        
        if ($request->hasFile('logo_putanja')) {
            if (File::exists($podcast->logo_putanja)) {
                File::delete($podcast->logo_putanja);
            }
           $podcast->logo_putanja =  $this->uploadLogo($request->file('logo_putanja'), $request->naslov);

        }

       
        $podcast->save();

        return response()->json([
            'message' => 'Podkast je uspešno izmenjen!',
            'data' => $podcast
        ], 200);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Došlo je do greške prilikom ažuriranja podkasta. ' . $e->getMessage()
        ], 500);
    }
}


  
}

    






