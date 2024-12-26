using Microsoft.AspNetCore.Mvc;

namespace WorkManagement.API.Controllers
{
    public class FileData
    {
        public string Id { get; set; }
        public string FileName { get; set; }
        public string Status { get; set; } // 'Uploaded' or 'Failed'
        public string UploadDate { get; set; }
        public object[] Content { get; set; } // Optional
        public string CsvType { get; set; } // 'attendance' or 'timesheet'
    }

    public class IntegrationController : APIControllerBase
    {
        public IActionResult UploadCsv(FileData fileData)
        {
            return Ok();
        }

        public ActionResult<FileData> GetCsvContent(int fileId)
        {
            return new FileData();
        }
    }
}
