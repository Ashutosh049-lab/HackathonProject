# Test status update endpoint
# Replace these values:
$COMPLAINT_ID = "YOUR_COMPLAINT_ID_HERE"
$ADMIN_TOKEN = "YOUR_ADMIN_TOKEN_HERE"

$headers = @{
    "Authorization" = "Bearer $ADMIN_TOKEN"
    "Content-Type" = "application/json"
}

$body = @{
    status = "In Progress"
    comment = "Testing email notification"
} | ConvertTo-Json

Write-Host "Testing status update for complaint: $COMPLAINT_ID"
Write-Host "Sending request to: http://localhost:8081/complaints/$COMPLAINT_ID/status"

try {
    $response = Invoke-RestMethod -Uri "http://localhost:8081/complaints/$COMPLAINT_ID/status" -Method PATCH -Headers $headers -Body $body
    Write-Host "`n✅ Success!"
    $response | ConvertTo-Json -Depth 5
} catch {
    Write-Host "`n❌ Error:"
    Write-Host $_.Exception.Message
    Write-Host $_.ErrorDetails.Message
}
