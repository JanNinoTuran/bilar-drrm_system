-- Create news table
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_on_landing BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_news_date ON news(date);
CREATE INDEX IF NOT EXISTS idx_news_category ON news(category);
CREATE INDEX IF NOT EXISTS idx_news_display_on_landing ON news(display_on_landing);

-- Add sample data
INSERT INTO news (title, date, category, description, image_url, display_on_landing)
VALUES 
('NDRRMC Conducts Nationwide Earthquake Drill', '2023-06-15', 'Training', 'The National Disaster Risk Reduction and Management Council (NDRRMC) successfully conducted a nationwide earthquake drill to enhance preparedness and response capabilities across the country. Over 500,000 participants from various sectors joined the simulation exercise.', 'https://images.unsplash.com/photo-1596720426673-e4e14290f0cc?w=800&q=80', true),
('New Early Warning System Deployed in Flood-Prone Areas', '2023-07-22', 'Technology', 'State-of-the-art early warning systems have been installed in 15 flood-prone municipalities across the region. These systems can detect rising water levels and automatically send alerts to residents and local authorities, providing crucial time for evacuation.', 'https://images.unsplash.com/photo-1574103188526-4fabd2623804?w=800&q=80', true),
('Community-Based Disaster Preparedness Program Launched', '2023-08-10', 'Community', 'A new community-based disaster preparedness program has been launched to empower local communities in disaster risk reduction. The program includes training on first aid, evacuation procedures, and basic search and rescue techniques.', 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80', true),
('Climate Change Adaptation Strategies for Coastal Communities', '2023-09-05', 'Climate', 'Experts have developed new adaptation strategies for coastal communities facing increased risks due to climate change. These strategies include mangrove restoration, elevated housing designs, and sustainable livelihood alternatives.', 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=800&q=80', true);
