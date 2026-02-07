export interface NEODetails {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: Array<{
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: {
      kilometers_per_second: string;
      kilometers_per_hour: string;
      miles_per_hour: string;
    };
    miss_distance: {
      astronomical: string;
      lunar: string;
      kilometers: string;
    };
    orbiting_body: string;
  }>;
}

export interface NEOSearchParams {
  start_date: string;
  end_date: string;
  api_key?: string;
}

export interface NEOSearchResponse {
  element_count: number;
  near_earth_objects: Record<string, NEODetails[]>;
}

class NASAAPIClient {
  private baseUrl = 'https://api.nasa.gov/neo/rest/v1';
  private apiKey: string;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || 'DEMO_KEY';
  }

  async searchNEOs(params: NEOSearchParams): Promise<NEOSearchResponse> {
    const searchParams = new URLSearchParams({
      start_date: params.start_date,
      end_date: params.end_date,
      api_key: this.apiKey,
    });

    const response = await fetch(`${this.baseUrl}/feed?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getNEODetails(id: string): Promise<NEODetails> {
    const searchParams = new URLSearchParams({
      api_key: this.apiKey,
    });

    const response = await fetch(`${this.baseUrl}/neo/${id}?${searchParams}`);
    
    if (!response.ok) {
      throw new Error(`NASA API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const nasaClient = new NASAAPIClient();
