const { createClient } = supabase
const supabseURL = 'https://hhewlyrcqyamaoafzwhr.supabase.co'
const supabseKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoZXdseXJjcXlhbWFvYWZ6d2hyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzU0OTY2MTEsImV4cCI6MTk5MTA3MjYxMX0.llUNeTKvdPDdRhFj-aUh0ybuF4vgTRJAvuosrYq56hE'
const supabaseConfig = createClient(supabseURL,supabseKEY)


export default supabaseConfig