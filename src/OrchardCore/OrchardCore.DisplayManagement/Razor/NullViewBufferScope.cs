using System;
using System.Buffers;
using System.IO;
using Microsoft.AspNetCore.Mvc.ViewFeatures.Buffers;

namespace OrchardCore.DisplayManagement.Razor
{
    public class NullViewBufferScope : IViewBufferScope
    {
        ArrayPool<ViewBufferValue> _segments = ArrayPool<ViewBufferValue>.Create();

        public TextWriter CreateWriter(TextWriter writer)
        {
            return writer;
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
}
