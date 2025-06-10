import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const apiKey = process.env.MOTION_API_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// POST - Insert motion detection record
export async function POST(request: NextRequest) {
  try {
    // Check API key
    const authHeader = request.headers.get('authorization');
    const providedKey = authHeader?.replace('Bearer ', '');
    
    if (!providedKey || providedKey !== apiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { detected } = body;

    // Validate input
    if (typeof detected !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid input. "detected" must be a boolean.' },
        { status: 400 }
      );
    }

    // Insert into database - using the correct table name with spaces/dashes
    const { data, error } = await supabase
      .from('motion-ss') // Updated to match your table name exactly
      .insert([{ detected }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message || JSON.stringify(error) },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        data: data[0],
        message: 'Motion detection recorded successfully'
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Retrieve motion detection records
export async function GET(request: NextRequest) {
  try {
    // Check API key
    const { searchParams } = new URL(request.url);
    const providedKey = searchParams.get('key');
    
    if (!providedKey || providedKey !== apiKey) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100); // Cap at 100
    const offset = Math.max(parseInt(searchParams.get('offset') || '0'), 0); // Ensure non-negative

    // Test connection first
    const { data: testData, error: testError } = await supabase
      .from('motion - ss') // Updated to match your table name exactly
      .select('count(*)', { count: 'exact', head: true });

    if (testError) {
      console.error('Supabase connection test error:', testError);
      return NextResponse.json(
        { error: 'Database connection error', details: testError.message || JSON.stringify(testError) },
        { status: 500 }
      );
    }

    // Fetch from database
    const { data, error, count } = await supabase
      .from('motion - ss') // Updated to match your table name exactly
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json(
        { error: 'Database query error', details: error.message || JSON.stringify(error) },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (offset + limit) < (count || 0)
      }
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
