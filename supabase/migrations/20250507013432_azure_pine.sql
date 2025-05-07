/*
  # Initial schema for No-Show Tracker

  1. New Tables
    - customers
      - id (uuid, primary key)
      - phone_number (text, unique)
      - created_at (timestamp)
    
    - no_shows
      - id (uuid, primary key)
      - customer_id (uuid, foreign key)
      - date (timestamp)
      - order_type (text)
      - value (numeric)
      - notes (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create no_shows table
CREATE TABLE IF NOT EXISTS no_shows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  date timestamptz NOT NULL,
  order_type text NOT NULL,
  value numeric,
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE no_shows ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to authenticated users" ON customers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON customers
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Allow read access to authenticated users" ON no_shows
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow insert access to authenticated users" ON no_shows
  FOR INSERT TO authenticated WITH CHECK (true);