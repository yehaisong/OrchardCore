using System.Buffers;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Buffers;

namespace OrchardCore.DisplayManagement.Razor
{
    public class NullViewBufferScope : IViewBufferScope
    {
        ArrayPool<ViewBufferValue> _segments = ArrayPool<ViewBufferValue>.Create();

        public TextWriter CreateWriter(TextWriter writer)
        {
            return new PassThroughWriter(writer);
        }

        public ViewBufferValue[] GetPage(int pageSize)
        {
            return _segments.Rent(pageSize);
        }

        public void ReturnSegment(ViewBufferValue[] segment)
        {
            _segments.Return(segment, true);
        }
    }

    internal class PassThroughWriter : TextWriter
    {
        private readonly TextWriter _writer;

        public PassThroughWriter(TextWriter writer)
        {
            _writer = writer;
        }

        public override Encoding Encoding => _writer.Encoding;

        public override void Write(char value)
        {
            _writer.Write(value);
        }

        public override void Write(char[] value)
        {
            _writer.Write(value);
        }

        public override void Write(char[] buffer, int index, int count)
        {
            _writer.Write(buffer, index, count);
        }

        public override void Write(string value)
        {
            _writer.Write(value);
        }

        public override void Write(object value)
        {
            _writer.Write(value);
        }
    }
}
